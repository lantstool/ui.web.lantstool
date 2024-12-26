import { transformForExport } from '../utils.js';

const rpcCaller = (rpc) => rpc.getGenesisConfig({ responseNameConvention: 'snake_case' });

const exportTransformer = transformForExport({ version: '1.0' });

export const getGenesisConfig = {
  rpcCaller,
  exportTransformer,
  importTransformer: () => ({}),
};
