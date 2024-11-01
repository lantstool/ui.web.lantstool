export const getParams = ({ finality, blockId, blockTarget, ...rest }) =>
  blockTarget === 'latest'
    ? {
        ...rest,
        finality,
      }
    : {
        ...rest,
        blockId,
      };
