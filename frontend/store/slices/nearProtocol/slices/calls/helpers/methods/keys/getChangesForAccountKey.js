import {
  getBlockTargetParams,
  getDropdownValueForExport,
  getDropdownValueForImport,
  getFormBlockTarget,
  transformForExport,
} from '../utils.js';

const rpcCaller = (rpc, params) => {
  const accountKeyPairs = params.accountKeyPairs.map((pair) => ({
    accountId: pair.accountId.value,
    publicKey: pair.publicKey.value,
  }));

  return rpc.getChangesForAccountKey(
    getBlockTargetParams({
      accountKeyPairs,
      blockTarget: params.blockTarget,
      finality: params.finality.value,
      blockId: params.blockId,
      responseNameConvention: 'snake_case',
    }),
  );
};

const exportTransformer = transformForExport({
  version: '1.0',
  paramsExtractor: (params) => {
    const accountKeyPairs = params.accountKeyPairs
      .filter((pair) => pair.accountId?.value)
      .map((pair) => ({
        accountId: getDropdownValueForExport(pair.accountId),
        publicKey: getDropdownValueForExport(pair.publicKey),
      }));

    return getBlockTargetParams({
      accountKeyPairs,
      blockTarget: params.blockTarget,
      finality: params.finality?.value,
      blockId: params.blockId,
    });
  },
});

const importTransformer = ({ params }) => {
  const accountKeyPairs =
    params.accountKeyPairs.length === 0
      ? [{ accountId: null, publicKey: null }]
      : params.accountKeyPairs.map((pair) => ({
          accountId: getDropdownValueForImport(pair.accountId),
          publicKey: getDropdownValueForImport(pair.publicKey),
        }));

  return {
    accountKeyPairs,
    ...getFormBlockTarget(params),
  };
};

export const getChangesForAccountKey = {
  rpcCaller,
  exportTransformer,
  importTransformer,
};
