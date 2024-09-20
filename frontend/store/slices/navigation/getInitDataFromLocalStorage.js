import { effect } from '../../../../react-vault/index.js';

export const getInitDataFromLocalStorage = effect(({ slice }) => {
  const setInitData = slice.getActions((slice) => slice.setInitData);
  const navigation = localStorage.getItem('[Near-Devtools][0][navigation]');

  if (navigation) {
    const data = JSON.parse(navigation);
    setInitData(data);
    return data.route;
  }

  const data = {
    route: '/testnet/transactions',
    routes: {},
  };
  setInitData(data);
  return data.route;
});
