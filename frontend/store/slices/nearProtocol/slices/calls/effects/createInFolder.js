import { effect } from '@react-vault';
import { config } from '../../../../../../ui/components/Space/NearProtocol/Network/Calls/Call/methods/_general/config.js';
import { getNewOrder } from '../../../helpers/getNewOrder.js';

export const createInFolder = effect(async ({ store, slice, payload }) => {
  const { spaceId, networkId, navigate, parentId, items } = payload;

  const [backend] = store.getEntities((store) => store.backend);
  const setList = slice.getActions((slice) => slice.setList);

  try {
    const folders = items.filter((item) => item.itemType === 'folder');
    const order = getNewOrder(folders, parentId);

    const body = {
      method: config.methodNames.callContractViewMethod,
      contractId: null,
      methodName: null,
      args: '',
      blockTarget: 'latest',
      finality: config.finality.final,
      blockId: '',
    };

    const updatedList = await backend.sendRequest('nearProtocol.calls.createInFolder', {
      spaceId,
      networkId,
      parentId,
      order,
      body,
    });

    setList(updatedList);

    const destination = updatedList.find((tx) => tx.order === order).callId;
    navigate(`/space/${spaceId}/near-protocol/${networkId}/calls/${destination}`);
  } catch (e) {
    console.log(e);
  }
});
