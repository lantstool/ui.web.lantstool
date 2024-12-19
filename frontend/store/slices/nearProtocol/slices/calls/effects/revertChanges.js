import { effect } from '@react-vault';

export const revertChanges = effect(async ({ store, slice, payload }) => {
  const { form, callId } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const setupDraft = slice.getActions((slice) => slice.setupDraft);

  try {
    const call = await backend.sendRequest('nearProtocol.calls.getOne', callId);
    setupDraft(call);
    form.reset(call.body);
  } catch (e) {
    console.log(e);
  }
});
