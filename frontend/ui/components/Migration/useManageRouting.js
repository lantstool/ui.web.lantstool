import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';

//TODO
export const useManageRouting = () => {
  const navigate = useNavigate();
  const migrations = useStoreEffect((store) => store.spaces.getMigrations);

// When we have new version of BD we must redirect user to run migration step by step

  // useEffect(() => {
  //   (async () => {
  //     const count = await getCount();
  //     if (migrations) navigate('/migration');
  //   })();
  // }, []);
};
