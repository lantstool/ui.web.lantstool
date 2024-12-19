import { effect } from '@react-vault';

export const getOne = effect(async ({ store, slice, payload }) => {
  const [backend] = store.getEntities((store) => store.backend);
  const setOne = slice.getActions((slice) => slice.setOne);

  try {
    const network = await backend.sendRequest('nearProtocol.networks.getOne', payload);
    setOne(network);
  } catch (e) {
    console.log(e);
  }
});
