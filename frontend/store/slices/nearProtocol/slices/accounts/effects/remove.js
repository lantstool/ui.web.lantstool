import { effect } from '../../../../../../../react-vault/index.js';

export const remove = effect(async ({ slice, store, payload }) => {
  const { spaceId, accountId, navigate } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const removeAccount = slice.getActions((slice) => slice.removeAccount);

  try {
    await backend.sendRequest('nearProtocol.accounts.remove', { spaceId, accountId });
    removeAccount(accountId);
    navigate(`../../accounts`, { relative: 'path', replace: true });
  } catch (e) {
    console.log(e);
  }
});
