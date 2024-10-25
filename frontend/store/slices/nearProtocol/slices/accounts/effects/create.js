import { effect } from '../../../../../../../react-vault/index.js';

export const create = effect(async ({ slice, store, payload }) => {
  const { formValues, resetField, spaceId, networkId } = payload;
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
    resetField('accountId');
    resetField('note');
  } catch (e) {
    console.log(e);
  }
});
