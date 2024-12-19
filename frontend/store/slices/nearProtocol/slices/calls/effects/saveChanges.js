import { effect } from '@react-vault';

export const saveChanges = effect(async ({ store, slice, payload }) => {
  const { form, callId } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const setupDraft = slice.getActions((slice) => slice.setupDraft);

  const body = form.getValues();

  try {
    const call = await backend.sendRequest('nearProtocol.calls.updateOneBody', {
      body,
      callId,
    });
    setupDraft(call);
  } catch (e) {
    console.log(e);
  }
});
