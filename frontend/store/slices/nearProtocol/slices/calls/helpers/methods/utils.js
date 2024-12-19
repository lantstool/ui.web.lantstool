export const getBlockTargetParams = ({ finality, blockId, blockTarget, ...rest }) =>
  blockTarget === 'latest' ? { ...rest, finality } : { ...rest, blockId };

export const toFormBlockTarget = ({ finality, blockId, ...rest }) =>
  finality
    ? {
        ...rest,
        finality: { value: finality, label: finality },
      }
    : finality;

export const transformForExport =
  ({ paramsExtractor, version = '1.0' }) =>
  ({ call, form }) => ({
    blockchain: 'near-protocol',
    networkId: call.networkId,
    call: {
      version,
      name: call.name,
      method: form.getValues().method.value,
      params: {
        ...paramsExtractor(form.getValues()),
      },
    },
  });
