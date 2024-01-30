import { effect } from '../../../react-vault';

export const getInitDataFromLocalStorage = effect(({ slice }: any) => {
  const setInitData = slice.getActions((slice: any) => slice.setInitData);
  const navigation = localStorage.getItem('[Near-Devtools][0][navigation]');

  if (navigation) {
    const data = JSON.parse(navigation);
    setInitData(data);
    return data.route;
  }

  const data = {
    route: '/testnet1',
    routes: {},
  };
  setInitData(data);
  return data.route;
});
