import * as yup from 'yup';
import { useStoreEffect } from '@react-vault';

export const createSchema =  ( spaceId, networkId) => {
  const getAccounts = useStoreEffect((store) => store.nearProtocol.accounts.getAll);

  return yup.object({
    accountId: yup
      .string()
      .required('Empty field')
      .min(2)
      .max(64)
      .test('matches', 'This account already exists', async (value) => {
        const accounts = await getAccounts({spaceId, networkId})
        const list =  Object.values(accounts);
        return !list.find((el) => el.accountId === value);
      }),
    note: yup.string().max(84),
  });
};
