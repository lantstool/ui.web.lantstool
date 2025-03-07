import { effect } from '@react-vault';
import { config } from '../../../../../../ui/components/Space/NearProtocol/Network/Calls/Call/methods/_general/config.js';

export const createOne = effect(async ({ store, slice, payload }) => {
  const [backend] = store.getEntities((store) => store.backend);
  const { spaceId, networkId, navigate } = payload;
  const pushOneToList = slice.getActions((slice) => slice.pushOneToList);

  // TODO organize better approach for passing config
  const body = {
    method: config.methodNames.callContractViewMethod,
    contractId: null,
    methodName: null,
    args: '',
    blockTarget: 'latest',
    finality: config.finality.final,
    blockId: '',
  };

  try {
    const call = await backend.sendRequest('nearProtocol.calls.createOne', {
      spaceId,
      networkId,
      body,
    });

    pushOneToList(call);
    navigate(`${call.callId}`);
  } catch (e) {
    console.log(e);
  }
});
