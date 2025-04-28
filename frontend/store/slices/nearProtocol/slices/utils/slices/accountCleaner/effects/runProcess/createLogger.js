export const createLogger = ({ addLog, spaceId, networkId }) => {
  const createFn = (type) => (message) => {
    addLog({
      spaceId,
      networkId,
      log: {
        type,
        message,
        timestamp: Date.now(),
      },
    });
  };

  return {
    info: createFn('info'),
    error: createFn('error'),
    success: createFn('success'),
  };
};
