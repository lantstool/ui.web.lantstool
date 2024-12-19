const rpcCaller = (rpc, params) =>
  rpc.getMaintenanceWindows({
    validatorId: params.validatorId.value,
    responseNameConvention: 'snake_case',
  });

export const getMaintenanceWindows = {
  rpcCaller,
};
