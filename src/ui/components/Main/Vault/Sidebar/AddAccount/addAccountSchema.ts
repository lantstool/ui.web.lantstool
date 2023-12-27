import * as yup from 'yup';
import { connect } from 'near-api-js';
import {asyncDebounce} from "../../../../../../store/vault/helpers/asyncDebounce.ts";

const near = await connect({
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://testnet.mynearwallet.com',
});

const verifyAccount = async (value: any) => {
  try {
    await near.connection.provider.query({
      request_type: 'view_account',
      finality: 'final',
      account_id: value,
    });
    return true;
  } catch (e) {
    console.log(e);
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
        return list.length > 0 ? !list.includes(value) : true;
      }),
  });
};
