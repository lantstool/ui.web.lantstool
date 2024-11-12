export const getBlockTargetParams = ({ finality, blockId, blockTarget, ...rest }) =>
  blockTarget === 'latest' ? { ...rest, finality } : { ...rest, blockId };
