// https://docs.near.org/api/rpc/protocol#genesis-config

export async function getGenesisConfig({ responseNameConvention = 'camelCase' }) {
  return await this.sendRequest({
    body: {
      method: 'EXPERIMENTAL_genesis_config',
    },
    responseNameConvention,
  });
}
