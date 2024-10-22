import { effect } from '@react-vault';

export const saveChanges = effect(async ({ store, slice, payload }) => {
  const { form, callId } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const setDraft = slice.getActions((slice) => slice.setDraft);

  const body = form.getValues();

  try {
    await backend.sendRequest('nearProtocol.calls.updateOneBody', {
      body,
      callId,
    });

    setDraft({ callId, draft: null });
    form.reset(body);
  } catch (e) {
    console.log(e);
  }
});
