import { effect } from '../../../../react-vault';

const spaceId = 'space1'; // TODO - get the real spaceId from store

export const getNetworks = effect(async ({ slice, store }: any) => {
  const [idb] = store.getEntities((store: any) => store.idb);
  const setNetworks = slice.getActions((slice: any) => slice.setNetworks);

  try {
    const networks = await idb.getAllFromIndex('networks', 'spaceId', spaceId);
    networks.sort((a: any, b: any) => (a.createdAt > b.createdAt ? 1 : -1));
    setNetworks(networks);
  } catch (e) {
    console.log(e);
  }
});
