import {effect} from "../../../../react-vault";


export const deleteKey = effect(async ({ slice, store, payload }: any) => {
    const { data, wallet, derivationPath } = payload;
    const [idb] = store.getEntities((store: any) => store.idb);
    const setKey = slice.getActions((slice: any) => slice.setKey);
    const networkId = store.getState((store: any) => store.networks.current.networkId);
    const spaceId = store.getState((store: any) => store.networks.current.spaceId);

    try {

        // await idb.delete('keys');

    } catch (e) {
        console.log(e);
    }
});
