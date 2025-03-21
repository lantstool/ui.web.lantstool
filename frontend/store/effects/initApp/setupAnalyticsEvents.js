import { parseUserAgent } from './parseUserAgent.js';

// TODO move to analytics
export const emitStartSession = async (analytics) => {
  const userData = await parseUserAgent();

  analytics.emitEvent({
    payload: {
      eventType: 'start-session',
      data: {
        referrer: document.referrer || null,
        page: location.pathname,
        language: navigator.language,
        screenWidth: screen.width,
        screenHeight: screen.height,
        userData,
      },
    },
  });
};
// TODO move to analytics
export const setupEmitEventsOnVisibilityChange = (analytics) => {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      analytics.emitEvent({
        payload: {
          eventType: 'continue-session',
        },
      });
    } else {
      analytics.emitEvent({
        payload: {
          eventType: 'stop-session',
        },
        keepAlive: true,
      });
    }
  });
};
