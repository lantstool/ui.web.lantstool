import { effect } from '../../../../react-vault';
import { v1 } from 'uuid';

const generateCall = (order: number, name: string, spaceId: string, networkId: string) => {
  const callId = v1();

  return {
    spaceId,
    networkId,
    callId,
    name,
    createdAt: Date.now(),
    order,
    contractId: '',
    method: '',
    arguments: '{}',
    signerId: '',
    signerKey: '',
  };
};

export const createCall = effect(async ({ payload, slice, store }: any) => {
  const { formValues, close, navigate } = payload;
  const [idb] = store.getEntities((store: any) => store.idb);
  const { spaceId, networkId } = store.getState((store: any) => store.networks.current);
  const addCall = slice.getActions((slice: any) => slice.addCall);

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

    const call = generateCall(callsOrder, formValues.name, spaceId, networkId);

    await Promise.all([
      idb.add('calls', call),
      idb.put('calls-counter', callsCounter),
    ]);

    addCall(call);
    navigate(call.callId);
    close();
  } catch (e) {
    console.log(e);
  }
});
