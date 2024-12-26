import { config } from '../../../../../../../ui/components/Space/NearProtocol/Network/Calls/Call/methods/_general/config.js';

export const getBlockTargetParams = ({ finality, blockId, blockTarget, ...rest }) =>
  blockTarget === 'latest' ? { ...rest, finality } : { ...rest, blockId };

export const transformForExport =
  ({ paramsExtractor, version }) =>
  ({ call, form }) => {
    const params = paramsExtractor ? paramsExtractor(form.getValues()) : undefined;

    return {
      blockchain: 'near-protocol',
      networkId: call.networkId,
      call: {
        version,
        name: call.name,
        method: form.getValues().method.value,
        params,
      },
    };
  };

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

export const getFormWaitUntil = (waitUntil) => config.waitUntil[waitUntil];
export const getDropdownValueForExport = (value) => value?.value || '';
export const getDropdownValueForImport = (value) => (value ? { value, label: value } : null);
