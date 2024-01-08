import * as yup from 'yup';
import { asyncDebounce } from '../../../../../../store/slices/vault/helpers/asyncDebounce.ts';
import { JsonRpcProvider } from 'near-api-js/lib/providers';

const verifyAccount = (rpc: string) => async (value: any) => {
  try {
    await new JsonRpcProvider({ url: rpc }).query({
      request_type: 'view_account',
      finality: 'final',
      account_id: value,
    });
    return true;
  } catch (e) {
    return false;
  }
};

export const createSchema = (list: any, timerRef: any, rpc: string) => {
  const debouncedVerifyAccount = asyncDebounce(() => verifyAccount(rpc), timerRef);
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
