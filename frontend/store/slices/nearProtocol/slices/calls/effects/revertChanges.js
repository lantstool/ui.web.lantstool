import { effect } from '@react-vault';

export const revertChanges = effect(({ payload, slice }) => {
  const { callId, form } = payload;
  const call = slice.getState((slice) => slice.call);
  const setDraft = slice.getActions((slice) => slice.setDraft);

  setDraft({ callId, draft: null });
  form.reset(call.body);
});
