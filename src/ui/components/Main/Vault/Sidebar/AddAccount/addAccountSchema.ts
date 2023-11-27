import * as yup from 'yup';
import { connect } from 'near-api-js';

const near = await connect({
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://testnet.mynearwallet.com',
});

const asyncDebounce = (func: any, timerRef: any) => {
  return (...args: any) => {
    clearTimeout(timerRef.current);
    return new Promise((resolve) => {
      const later = () => {
        resolve(func(...args));
      };
      const wait: any = timerRef.current === null || 3000;
      timerRef.current = setTimeout(later, wait);
    });
  };
};

const verifyAccount = async (value: any, values: any) => {
  try {
    await near.connection.provider.query({
      request_type: 'view_account',
      finality: 'final',
      account_id: value,
    });
    return true;
  } catch (e) {
    console.log(e);
    values.createError({ path: 'accountId' });
    return false;
  }
};

export const createSchema = (list: any, timerRef: any) => {
  const debouncedVerifyAccount = asyncDebounce(verifyAccount, timerRef);
  return yup.object({
    accountId: yup
      .string()
      .required('Account ID is required')
      .test('account-validation', 'Invalid Account ID', async function (value, values) {
        const verified = await debouncedVerifyAccount(value, values);
        return verified as boolean;
      })
      .test('account-validation', 'Account exists', function (value) {
        return !list.includes(value);
      }),
  });
};
