// https://docs.near.org/api/rpc/network#network-info

export async function getNetworkInfo({ responseNameConvention = 'camelCase' }) {
  return await this.sendRequest({
    body: {
      method: 'network_info',
    },
    responseNameConvention,
  });
}
