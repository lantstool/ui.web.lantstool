import { effect } from '@react-vault';

export const updateOneRpcType = effect(async ({ store, slice, payload }) => {
  const { callId, rpcType } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const editOneRpcType = slice.getActions((slice) => slice.editOneRpcType);

  try {
    await backend.sendRequest('nearProtocol.calls.updateOneRpcType', {
      rpcType,
      callId,
    });
    editOneRpcType({ rpcType, callId });
  } catch (e) {
    console.log(e);
  }
});
