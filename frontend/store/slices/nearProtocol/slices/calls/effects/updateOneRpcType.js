import { effect } from '@react-vault';

export const updateOneRpcType = effect(async ({ store, slice, payload }) => {
  const { callId, rpcType } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const editOneRpcType = slice.getActions((slice) => slice.editOneRpcType);

  try {
    const type = rpcType === 'regular' ? 'archival' : 'regular';

    await backend.sendRequest('nearProtocol.calls.updateOneRpcType', {
      rpcType: type,
      callId,
    });
    editOneRpcType({ rpcType: type, callId });
  } catch (e) {
    console.log(e);
  }
});
