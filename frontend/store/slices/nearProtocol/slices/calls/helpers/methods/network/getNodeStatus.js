import { transformForExport } from '../utils.js';

const rpcCaller = (rpc) => rpc.getNodeStatus({ responseNameConvention: 'snake_case' });

const exportTransformer = transformForExport({
  version: '1.0',
});

export const getNodeStatus = {
  rpcCaller,
  exportTransformer,
  importTransformer: () => ({}),
};
