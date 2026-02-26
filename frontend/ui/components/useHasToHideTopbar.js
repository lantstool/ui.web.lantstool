import { useMatch } from 'react-router-dom';

export const useHasToHideTopbar = () => {
  const getStartedMatch = useMatch('/get-started');
  const migration = useMatch('/migration');
  const importMatch = useMatch('/import/*');

  return Boolean(getStartedMatch) || Boolean(importMatch) || Boolean(migration);
};
