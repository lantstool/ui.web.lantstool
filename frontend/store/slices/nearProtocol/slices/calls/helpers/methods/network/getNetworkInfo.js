import { transformForExport } from '../utils.js';

const rpcCaller = (rpc) => rpc.getNetworkInfo({ responseNameConvention: 'snake_case' });

const exportTransformer = transformForExport({
  version: '1.0',
});

export const getNetworkInfo = {
  rpcCaller,
  exportTransformer,
  importTransformer: () => ({}),
};
