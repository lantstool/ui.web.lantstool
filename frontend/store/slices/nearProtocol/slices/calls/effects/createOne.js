import { effect } from '@react-vault';

export const createOne = effect(async ({ store, slice, payload }) => {
  const [backend] = store.getEntities((store) => store.backend);
  const { spaceId, networkId, navigate } = payload;
  const pushOneToList = slice.getActions((slice) => slice.pushOneToList);
  const getCount = slice.getEffects((slice) => slice.getCount);

  try {
    const count = await getCount({ spaceId, networkId });
    const call = await backend.sendRequest('nearProtocol.calls.createOne', {
      spaceId,
      networkId,
      name: `Call#${count + 1}`,
    });

    pushOneToList(call);
    navigate(`${call.callId}`);
  } catch (e) {
    console.log(e);
  }
});
