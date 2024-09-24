import { effect } from '../../../../../react-vault/index.js';

export const create = effect(async ({ store, payload }) => {
  const { formValues, navigate } = payload;
  const [backend] = store.getEntities((store) => store.backend);

  try {
    const space = await backend.sendRequest('spaces.create', formValues);
    // get space id and set data to state
    navigate(`/space/${space.spaceId}/select-blockchain`);
  } catch (e) {
    console.log(e);
  }
});
