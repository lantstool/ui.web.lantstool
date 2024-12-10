import { useMatch } from 'react-router-dom';

export const useHasToHideTopbar = () => {
  const getStartedMatch = useMatch('/get-started');
  return Boolean(getStartedMatch);
};
