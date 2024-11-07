import { effect } from '@react-vault';

export const onMountCall = effect(async ({ store, slice, payload: callId }) => {
  const [backend] = store.getEntities((store) => store.backend);
  const setupDraft = slice.getActions((slice) => slice.setupDraft);
  const draft = slice.getState((slice) => slice.drafts[callId]);

  // We don't need to prepare and setup base draft from DB data
  // if user already was on this call page - he may have unsaved changes
  if (draft) return;

  try {
    const call = await backend.sendRequest('nearProtocol.calls.getOne', callId);
    setupDraft(call);
  } catch (e) {
    console.log(e);
  }
});
