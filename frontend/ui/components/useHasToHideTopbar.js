import { useMatch } from 'react-router-dom';

export const useHasToHideTopbar = () => {
  const getStartedMatch = useMatch('/get-started');
  const importMatch = useMatch('/import/*');

  return Boolean(getStartedMatch) || Boolean(importMatch);
};
