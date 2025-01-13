import { useStoreEffect } from '@react-vault';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../_general/Button/Button.jsx';
import cn from './ImportFromGithub.module.scss';

export const ImportFromGithub = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const importFromGithub = useStoreEffect((store) => store.importFromGithub);

  useEffect(() => {
    importFromGithub({ navigate, location, setError });
  }, []);

  return (
    <div className={cn.container}>
      {error ? (
        <div className={cn.errorContainer}>
          <p className={cn.error}>{error}</p>
          <Link to="/" replace>
            <Button>Back</Button>
          </Link>
        </div>
      ) : (
        <p className={cn.loading}>Loading...</p>
      )}
    </div>
  );
};
