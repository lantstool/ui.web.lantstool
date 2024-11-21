import { get } from 'lodash';

const devTools = window?.__REDUX_DEVTOOLS_EXTENSION__?.connect();

export const createState = ({ initState }) => {
  let state = initState;
  let subscribers = [];

  if (devTools) {
    devTools.init(initState);
    devTools.subscribe((message) => {
      if (message.type === 'DISPATCH' && message.payload.type === 'COMMIT') {
        devTools.init(state);
      }
    });
  }

  const getState = () => state;

  const setState = ({ nextState, payload, path, key }) => {
    state = nextState;
    subscribers.forEach((callback) => callback(nextState));
    if (devTools) devTools.send({ type: [...path, key].join('.'), payload }, nextState);
  };

  const subscribe = (callback) => {
    subscribers.push(callback);
    return () => {
      subscribers = subscribers.filter((cb) => cb !== callback);
    };
  };

  return {
    getState,
    setState,
    useSliceSelector: (path) => (selector) => selector(get(getState(), path)),
    useSelector: (selector) => selector(getState()),
    subscribe,
  };
};
