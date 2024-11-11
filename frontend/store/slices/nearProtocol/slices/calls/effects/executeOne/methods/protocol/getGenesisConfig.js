export const getGenesisConfig = (rpc) =>
  rpc.getGenesisConfig({
    responseNameConvention: 'snake_case',
  });
