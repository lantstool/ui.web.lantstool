import { effect } from '../../../../react-vault';
import { v1 } from 'uuid';

const generateCall = (
  name,
  order,
  method,
  spaceId,
  networkId,
) => {
  const callId = v1();

  return {
    spaceId,
    networkId,
    type: method.type,
    callId,
    name,
    createdAt: Date.now(),
    order,
    method: method.method,
    params: method.params,
  };
};

export const createCall = effect(async ({ payload, slice, store }) => {
  const { name, method, close, navigate } = payload;
  const [idb] = store.getEntities((store) => store.idb);
  const { spaceId, networkId } = store.getState((store) => store.networks.current);
  const addCall = slice.getActions((slice) => slice.addCall);
  console.log(name)
  try {
    const [callsOrder, callsCounter] = await Promise.all([
      idb.countFromIndex(
        'calls',
        'spaceId_networkId_order',
        IDBKeyRange.bound([spaceId, networkId, -Infinity], [spaceId, networkId, Infinity]),
      ),
      idb.get('calls-counter', [spaceId, networkId]),
    ]);
    callsCounter.count += 1;

    const call = generateCall(name, callsOrder, method, spaceId, networkId);

    await Promise.all([idb.add('calls', call), idb.put('calls-counter', callsCounter)]);

    addCall(call);
    navigate(call.callId);
    close();
  } catch (e) {
    console.log(e);
  }
});
