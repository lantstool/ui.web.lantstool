import { effect } from '@react-vault';

export const createOne = effect(async ({ store, slice, payload }) => {
  const [backend] = store.getEntities((store) => store.backend);
  const { spaceId, networkId, navigate } = payload;
  const pushOneToList = slice.getActions((slice) => slice.pushOneToList);

  try {
    const call = await backend.sendRequest('nearProtocol.calls.createOne', {
      spaceId,
      networkId,
    });

    pushOneToList(call);
    navigate(`${call.callId}`);
  } catch (e) {
    console.log(e);
  }
});
