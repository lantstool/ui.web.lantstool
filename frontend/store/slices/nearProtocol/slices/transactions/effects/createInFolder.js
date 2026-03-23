import { effect } from '@react-vault';
import { getNewOrder } from '../../../helpers/getNewOrder.js';

export const createInFolder = effect(async ({ store, slice, payload }) => {
  const { spaceId, networkId, navigate, parentId, items } = payload;

  const [backend] = store.getEntities((store) => store.backend);
  const setList = slice.getActions((slice) => slice.setList);

  try {
    const folders = items.filter((item) => item.itemType === 'folder');
    const order = getNewOrder(folders, parentId);

    const updatedList = await backend.sendRequest('nearProtocol.transactions.createInFolder', {
      spaceId,
      networkId,
      parentId,
      order,
    });
    setList(updatedList);

    const destination = updatedList.find((tx) => tx.order === order).transactionId;
    navigate(`/space/${spaceId}/near-protocol/${networkId}/transactions/${destination}`);
  } catch (e) {
    console.log(e);
  }
});
