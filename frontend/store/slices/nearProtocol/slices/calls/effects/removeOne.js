import { effect } from '@react-vault';

const getDestination = (calls, removedCallId, activeCallId) => {
  // If we have only 1 call and delete it - redirect to '/calls'
  if (calls.length === 1) return `..`;
  const index = calls.findIndex(({ callId }) => callId === removedCallId);
  // If we want to delete a call that is not active and avoid redirecting
  if (activeCallId && activeCallId !== removedCallId) return activeCallId;
  // If we want to delete the second or further call - return the upper one
  if (index > 0) return calls[index - 1].callId;
  // If we want to delete is first call in the list - return the lower one
  if (index === 0) return calls[index + 1].callId;
};

export const removeOne = effect(async ({ payload, slice, store }) => {
  const { spaceId, networkId, callId, activeCallId = null, navigate, closeModal } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const [history] = store.getEntities((store) => store.history);
  const list = slice.getState((slice) => slice.list);
  const setList = slice.getActions((slice) => slice.setList);
  const setNotification = store.getActions((store) => store.setNotification);

  try {
    const destination = getDestination(list, callId, activeCallId);

    const updatedList = await backend.sendRequest('nearProtocol.calls.removeOne', {
      spaceId,
      networkId,
      callId,
    });
    setList(updatedList);

    history.remove(`/space/${spaceId}/near-protocol/${networkId}/calls/${callId}`);
    closeModal();

    setNotification({ isOpen: true, message: 'Call deleted', variant: 'black' });
    navigate(`/space/${spaceId}/near-protocol/${networkId}/calls/${destination}`);
  } catch (e) {
    console.log(e);
  }
});
