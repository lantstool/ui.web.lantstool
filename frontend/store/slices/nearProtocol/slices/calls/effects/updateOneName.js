import { effect } from '@react-vault';

export const updateOneName = effect(async ({ payload, slice, store }) => {
  const { callId } = payload;
  const { name } = payload.formValues;
  const [backend] = store.getEntities((store) => store.backend);
  const editOneName = slice.getActions((slice) => slice.editOneName);

  try {
    editOneName({ name, callId });

    await backend.sendRequest('nearProtocol.calls.updateOneName', {
      name,
      callId,
    });
  } catch (e) {
    console.log(e);
  }
});
