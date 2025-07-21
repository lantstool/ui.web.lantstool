import { effect } from '@react-vault';

export const updateOneName = effect(async ({ payload, slice, store }) => {
  const { folderId } = payload;
  const { name } = payload.formValues;
  const [backend] = store.getEntities((store) => store.backend);
  const editOneName = slice.getActions((slice) => slice.editOneName);

  try {
    editOneName({ name, folderId });

    await backend.sendRequest('nearProtocol.folders.updateOneName', {
      name,
      folderId,
    });
  } catch (e) {
    console.log(e);
  }
});
