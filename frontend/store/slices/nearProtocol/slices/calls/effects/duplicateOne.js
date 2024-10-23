import { effect } from '@react-vault';

export const duplicateOne = effect(async ({ store, slice, payload }) => {
  const { spaceId, networkId, callId, closeMenu } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const setList = slice.getActions((slice) => slice.setList);

  try {
    const updatedList = await backend.sendRequest('nearProtocol.calls.duplicateOne', {
      spaceId,
      networkId,
      targetId: callId,
    });

    setList(updatedList);
    closeMenu();
  } catch (e) {
    console.log(e);
  }
});
