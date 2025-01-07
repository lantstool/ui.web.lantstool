import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';

export const useManageRouting = () => {
  const navigate = useNavigate();
  const getCount = useStoreEffect((store) => store.spaces.getCount);
  /**
   * We want to avoid the situation when the user can reach the Get Started page
   * if he has any space - if he will try to restore from backup when the app
   * wasn't reset - it will cause some bugs, for example - old contracts won't
   * be deleted from the OPFS and this may cause the disc space leak
   */
  useEffect(() => {
    (async () => {
      const count = await getCount();
      if (count > 0) navigate('/');
    })();
  }, []);
};
