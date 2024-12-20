import { config } from '../../../../../../../ui/components/Space/NearProtocol/Network/Calls/Call/methods/_general/config.js';

export const getBlockTargetParams = ({ finality, blockId, blockTarget, ...rest }) =>
  blockTarget === 'latest' ? { ...rest, finality } : { ...rest, blockId };

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

export const getFormBlockTarget = ({ finality, blockId }) =>
  finality
    ? {
        blockTarget: 'latest',
        finality: config.finality[finality],
        blockId: '',
      }
    : {
        blockTarget: 'specific',
        finality: config.finality.final,
        blockId,
      };
