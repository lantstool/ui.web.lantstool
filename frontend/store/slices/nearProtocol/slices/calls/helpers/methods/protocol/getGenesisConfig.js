const rpcCaller = (rpc) =>
  rpc.getGenesisConfig({
    responseNameConvention: 'snake_case',
  });

export const getGenesisConfig = {
  rpcCaller,
};
