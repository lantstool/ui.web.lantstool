import { delay } from '../../../../../../../../helpers/utils.js';

export const mockLogger = async ({ addLog, spaceId, networkId, setOperationStatus }) => {
  for (let i = 1; i <= 10; i++) {
    await delay(500);
    addLog({
      spaceId,
      networkId,
      log: {
        type: 'info',
        message: `Complete request: ${i}`,
        timestamp: Date.now(),
      },
    });
  }

  setOperationStatus({
    spaceId,
    networkId,
    status: 'completed',
  });
};
