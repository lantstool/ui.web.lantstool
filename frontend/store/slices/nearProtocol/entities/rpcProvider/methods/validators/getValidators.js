// https://docs.near.org/api/rpc/network#validation-status

export async function getValidators({ epochId, responseNameConvention = 'camelCase' }) {
  const params = epochId ? { epoch_id: epochId } : [null];

  return await this.sendRequest({
    body: {
      method: 'validators',
      params,
    },
    responseNameConvention,
  });
}
