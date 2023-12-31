import { action } from '../../../../react-vault';

export const navigate = action(({ slice, payload }: any) => {
  if (typeof payload === 'string') {
    slice.route = payload;
    slice.routeParams = null;
    return;
  }
  slice.route = payload.route;
  slice.routeParams = payload.routeParams;
});
