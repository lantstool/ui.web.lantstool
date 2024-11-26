import { effect } from '@react-vault';

// TODO: handle the case when we delete the last call in the list - we also need
// to clear navigation state for calls and we shouldn't navigate to last
// deleted call

const getDestination = (calls, targetId) => {
  // If we have only 1 call and delete it - redirect to '/calls'
  if (calls.length === 1) return `..`;
  const index = calls.findIndex(({ callId }) => callId === targetId);
  // If we want to delete the second or further call - return the upper one
  if (index > 0) return `../${calls[index - 1].callId}`;
  // If we want to delete is first call in the list - return the lower one
  if (index === 0) return `../${calls[index + 1].callId}`;
};

export const removeOne = effect(async ({ payload, slice, store }) => {
  const { spaceId, networkId, callId, navigate } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const list = slice.getState((slice) => slice.list);
  const setList = slice.getActions((slice) => slice.setList);

  try {
    const destination = getDestination(list, callId);

    const updatedList = await backend.sendRequest('nearProtocol.calls.removeOne', {
      spaceId,
      networkId,
      callId,
    });

    setList(updatedList);
    navigate(destination, { relative: 'path ', replace: true });
  } catch (e) {
    console.log(e);
  }
});
