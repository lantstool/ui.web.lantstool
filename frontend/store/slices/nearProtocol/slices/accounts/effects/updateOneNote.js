import { effect } from '@react-vault';

export const updateOneNote = effect(async ({ payload, slice, store }) => {
  const { accountId, reset } = payload;
  const { note } = payload.formValues;
  const [backend] = store.getEntities((store) => store.backend);
  const editNote = slice.getActions((slice) => slice.editNote);
  const setNotification = store.getActions((store) => store.setNotification);

  try {
    await backend.sendRequest('nearProtocol.accounts.updateOneNote', {
      note,
      accountId,
    });
    editNote({ note, accountId });
    reset({ note });
    setNotification({ isOpen: true, message: 'Changes saved', color: 'success', daley: 1500 });
  } catch (e) {
    console.log(e);
  }
});
