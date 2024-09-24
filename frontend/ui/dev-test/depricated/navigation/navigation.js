import { action, effect } from '../../../../../react-vault/index.js';
import { matchPath } from 'react-router-dom';
import { get, set } from 'lodash';
import { current } from 'immer';
import { getInitDataFromLocalStorage } from './getInitDataFromLocalStorage.js';

const saveDynamicRoute = (slice, pattern, pathname, pathToSave) => {
  const match = matchPath(pattern, pathname);
  if (!match) return;
  slice.routes = set(slice.routes, pathToSave(match.params), match.pathname);
};

const splitPathname = (pathname) => pathname.substring(1).replaceAll('/', '.');

export const navigation = {
  route: null,
  routes: {},

  setCurrentLocation: action(({ payload: location, slice }) => {
    const { pathname } = location;
    slice.route = pathname;

    saveDynamicRoute(
      slice,
      '/:currentNetworkId/*',
      pathname,
      ({ currentNetworkId }) => `${currentNetworkId}.route`,
    );

    saveDynamicRoute(
      slice,
      '/:currentNetworkId/transactions/:transactionId',
      pathname,
      ({ currentNetworkId }) => `${currentNetworkId}.transactions.route`,
    );

    saveDynamicRoute(
      slice,
      '/:currentNetworkId/calls/:callId',
      pathname,
      ({ currentNetworkId }) => `${currentNetworkId}.calls.route`,
    );

    const nav = current(slice);
    // TODO move to effect
    setTimeout(
      () => localStorage.setItem('[Near-Devtools][0][navigation]', JSON.stringify(nav)),
      0,
    );
  }),

  navigateTo: effect(({ payload, slice }) => {
    const { match, navigate, fallbackRoute } = payload;
    const routes = slice.getState((slice) => slice.routes);
    const destination = get(routes, `${splitPathname(match.pathname)}.route`) || fallbackRoute;
    navigate(destination);
  }),

  setInitData: action(({ payload, slice }) => {
    slice.route = payload.route;
    slice.routes = payload.routes;
  }),

  // effects
  getInitDataFromLocalStorage,
};
