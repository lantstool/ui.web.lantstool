import { action } from '../../../../react-vault';

export const duplicateTransaction = action(({ slice, payload }: any) => {
  const { updateOrder, duplicate } = payload;

  // console.log(slice.list.length, 'length')
  // console.log(duplicate.order, 'order')
  console.log(updateOrder)
  if (duplicate.order === slice.list.length) {
    updateOrder.push({ [duplicate.transactionId]: duplicate.order });
  } else {
    updateOrder.unshift({ [duplicate.transactionId]: duplicate.order });
  }

  const list = [...slice.list];
  const keysArray = Object.keys(updateOrder);
  const namesArray = keysArray.map((key) => Object.keys(updateOrder[key])[0]);

  list.splice(duplicate.order, updateOrder.length, ...namesArray);

  slice.list = list;
  slice.map[duplicate.transactionId] = duplicate;
});
