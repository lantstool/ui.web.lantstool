import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useStoreEntity } from '@react-vault';

interface HistoryEntity {
  update: (path: string) => void;
}

// @react-vault is still JS. Its real contract (verified from source) is:
//   useStoreEntity<T>(selector: (entities) => T): T
// We assert that contract locally, scoped to the slice we use.
// Remove this cast once @react-vault is migrated to TypeScript.
const useEntity = useStoreEntity as <T>(
  selector: (entities: { history: HistoryEntity }) => T,
) => T;

export const useSaveToHistory = (): void => {
  const history = useEntity((entities) => entities.history);
  const location = useLocation();

  useEffect(() => {
    history.update(location.pathname);
  }, [location.pathname, history]);
};
