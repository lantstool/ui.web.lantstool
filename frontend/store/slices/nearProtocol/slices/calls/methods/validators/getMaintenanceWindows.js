export const getMaintenanceWindows = (rpc, params) =>
  rpc.getMaintenanceWindows({
    validatorId: params.validatorId.value,
    responseNameConvention: 'snake_case',
  });
