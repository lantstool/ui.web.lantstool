import { effect } from '../../../../../../../react-vault/index.js';

export const createOne = effect(async ({ store, slice, payload }) => {
  const [backend] = store.getEntities((store) => store.backend);
  const { spaceId, networkId, formValues, navigate, closeModal } = payload;
  const pushOneToList = slice.getActions((slice) => slice.pushOneToList);

  try {
    const call = await backend.sendRequest('nearProtocol.calls.createOne', {
      spaceId,
      networkId,
      name: formValues.name,
    });

    pushOneToList(call);
    closeModal();
    navigate(`${call.callId}`);
  } catch (e) {
    console.log(e);
  }
});
