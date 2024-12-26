import { getBlockTargetParams, getFormBlockTarget, transformForExport } from '../utils.js';

const rpcCaller = (rpc, params) =>
  rpc.getProtocolConfig(
    getBlockTargetParams({
      finality: params.finality.value,
      blockId: params.blockId,
      responseNameConvention: 'snake_case',
    }),
  );

const exportTransformer = transformForExport({
  version: '1.0',
  paramsExtractor: (params) =>
    getBlockTargetParams({
      blockTarget: params.blockTarget,
      finality: params.finality?.value,
      blockId: params.blockId,
    }),
});

const importTransformer = ({ params }) => getFormBlockTarget(params);

export const getProtocolConfig = {
  rpcCaller,
  exportTransformer,
  importTransformer,
};
