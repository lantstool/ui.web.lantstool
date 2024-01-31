import { effect } from '../../../../react-vault';
import { v4 } from 'uuid';

const spaceId = 'space-uuid'; // TODO - get the real spaceId from store

export const createNetwork = effect(async ({ payload, slice, store }: any) => {
  const [idb] = store.getEntities((store: any) => store.idb);
  const addNetwork = slice.getActions((slice: any) => slice.addNetwork);
  const { name, url } = payload;

  try {
    const network = {
      spaceId,
      networkId: v4(),
      name,
      createdAt: Date.now(),
      url,
    };

    await idb.add('networks', network);
    addNetwork(network);
  } catch (e) {
    console.log(e);
  }
});
