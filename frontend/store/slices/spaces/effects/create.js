import { effect } from '../../../../../react-vault/index.js';

export const create = effect(async ({ store, slice, payload }) => {
  const { formValues, navigate } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const putOneToList = slice.getActions((slice) => slice.putOneToList);

  try {
    const space = await backend.sendRequest('spaces.create', formValues);
    putOneToList(space);
    navigate(`/space/${space.spaceId}/select-blockchain`);
  } catch (e) {
    console.log(e);
  }
});
