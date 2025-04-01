import { entity } from '@react-vault';

const createAnalytics = async (backend) => {
  const userId = await backend.sendRequest('users.getOwnerId');
  const sessionId = crypto.randomUUID();

  const state = {
    userId,
    sessionId,
  };

  const emitEvent = ({ payload, keepAlive = false }) => {
    const analyticsUrl = import.meta.env.VITE_ANALYTICS_URL;
    // Usually we don't want to send events during development
    if (!analyticsUrl) return;

    try {
      fetch(`${analyticsUrl}/analytics/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        keepalive: keepAlive,
        body: JSON.stringify({
          ...payload,
          userId: state.userId,
          sessionId: state.sessionId,
        }),
      });
    } catch (e) {}
  };

  const reset = async () => {
    // TODO implement - use it after the app reset action
  };

  return {
    emitEvent,
    reset,
  };
};

export const analytics = entity(async ({ store }) => {
  const [backend] = store.getEntities((store) => store.backend);
  return await createAnalytics(backend);
});
