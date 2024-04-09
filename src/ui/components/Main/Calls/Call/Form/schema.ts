import * as yup from 'yup';
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
    console.log(e);
    return false;
  }
};

export const createSchema = (rpc: any) => {
  return yup.object({
    contractId: yup
      .object()
      .required('Account ID is required')
      .test('account-validation', 'Invalid Account ID', async (value: any) => {
        const verified: any = await verifyAccount(rpc)(value.value);
        return verified as boolean;
      }),
  });
};
