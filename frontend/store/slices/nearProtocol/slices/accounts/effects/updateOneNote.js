import { effect } from '@react-vault';

export const updateOneNote = effect(async ({ payload, slice, store }) => {
  const { spaceId, networkId, accountId, reset } = payload;
  const { note } = payload.formValues;
  const [backend] = store.getEntities((store) => store.backend);
  const editNote = slice.getActions((slice) => slice.editNote);
  const setNotification = store.getActions((store) => store.setNotification);

  try {
    await backend.sendRequest('nearProtocol.accounts.updateOneNote', {
      spaceId,
      networkId,
      note,
      accountId,
    });
    editNote({ note, accountId });
    reset({ note });
    setNotification({ isOpen: true, message: 'Changes saved', variant: 'success' });
  } catch (e) {
    console.log(e);
  }
});
