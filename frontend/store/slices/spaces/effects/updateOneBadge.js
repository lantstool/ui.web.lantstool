import { effect } from '@react-vault';

export const updateOneBadge = effect(async ({ store, slice, payload }) => {
  const [backend] = store.getEntities((store) => store.backend);
  const editOne = slice.getActions((slice) => slice.editOne);

  try {
    await backend.sendRequest('spaces.updateOneBadge', payload);
    editOne(payload);
  } catch (e) {
    console.log(e);
  }
});
