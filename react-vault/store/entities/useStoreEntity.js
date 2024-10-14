import { useStoreContext } from '../provider/StoreProvider.jsx';

export const useStoreEntity = (selector) => {
  const store = useStoreContext();
  const [entity] = store.entities.useSelector(selector);
  return entity;
};
