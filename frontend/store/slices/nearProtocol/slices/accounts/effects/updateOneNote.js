import { effect } from '@react-vault';

export const updateOneNote = effect(async ({ payload, slice, store }) => {
  const { accountId } = payload;
  const { note } = payload.formValues;
  const [backend] = store.getEntities((store) => store.backend);
  const editNote = slice.getActions((slice) => slice.editNote);

  try {
    await backend.sendRequest('nearProtocol.accounts.updateOneNote', {
      note,
      accountId,
    });
    editNote({ note, accountId });
  } catch (e) {
    console.log(e);
  }
});
