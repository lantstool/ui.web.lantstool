import { effect } from '@react-vault';

export const resetHistory = effect(({ store, payload }) => {
  const { navigate } = payload;
  const [history] = store.getEntities((store) => store.history);

  history.reset();
  navigate('/spaces');
});
