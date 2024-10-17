import { effect } from '../../../../../../../react-vault/index.js';

export const create = effect(async ({ slice, store, payload }) => {
  const { formValues, setAccId, resetField, spaceId, networkId } = payload;
  const { accountId, note } = formValues;
  const [backend] = store.getEntities((store) => store.backend);
  const setAccount = slice.getActions((slice) => slice.setAccount);

  try {
    const account = await backend.sendRequest('nearProtocol.accounts.create', {
      accountId,
      spaceId,
      networkId,
      note,
    });

    setAccount(account);
    setAccId(formValues.accountId);
    resetField('accountId');
    resetField('note');
  } catch (e) {
    console.log(e);
  }
});
