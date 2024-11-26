// https://docs.near.org/api/rpc/network#node-status

export async function getNodeStatus({ responseNameConvention = 'camelCase' }) {
  return await this.sendRequest({
    body: {
      method: 'status',
    },
    responseNameConvention,
  });
}
