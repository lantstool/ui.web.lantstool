import { effect } from '@react-vault';

export const getOne = effect(async ({ store, slice, payload: callId }) => {
  const [backend] = store.getEntities((store) => store.backend);
  const setOne = slice.getActions((slice) => slice.setOne);

  try {
    const call = await backend.sendRequest('nearProtocol.calls.getOne', callId);
    setOne(call);
  } catch (e) {
    console.log(e);
  }
});
