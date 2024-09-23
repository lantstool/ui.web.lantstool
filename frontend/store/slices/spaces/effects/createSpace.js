import { effect } from '../../../../../react-vault/index.js';

export const createSpace = effect(async ({ store, payload }) => {
  const { values, navigate } = payload;
  const [backend] = store.getEntities((store) => store.backend);

  try {
    const space = await backend.sendRequest('spaces.createSpace', values);
    console.log(space);
    // get space id and set data to state
    navigate(`/space/${space.spaceId}/select-blockchain`);
  } catch (e) {
    console.log(e);
  }
});
