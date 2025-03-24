import { parseUserAgent } from './parseUserAgent.js';

// TODO move to analytics
export const emitStartSession = async (analytics) => {
  const userAgentData = await parseUserAgent();

  analytics.emitEvent({
    payload: {
      eventType: 'start-session',
      eventData: {
        referrer: document.referrer || null,
        page: location.pathname,
        language: navigator.language,
        screenWidth: screen.width,
        screenHeight: screen.height,
        userAgentData,
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
          eventData: {
            page: location.pathname,
          },
        },
      });
    } else {
      analytics.emitEvent({
        payload: {
          eventType: 'stop-session',
          eventData: {
            page: location.pathname,
          },
        },
        keepAlive: true,
      });
    }
  });
};
