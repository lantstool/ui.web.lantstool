// https://docs.near.org/api/rpc/maintenance-windows#maintenance-windows

export async function getMaintenanceWindows({ validatorId, responseNameConvention = 'camelCase' }) {
  return await this.sendRequest({
    body: {
      method: 'EXPERIMENTAL_maintenance_windows',
      params: {
        account_id: validatorId,
      },
    },
    responseNameConvention,
  });
}
