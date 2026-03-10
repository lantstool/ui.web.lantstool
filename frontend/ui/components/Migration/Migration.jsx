import logoLantstool from '@assets/logoLantstool.svg';
import { Card } from '../GetStarted/Card/Card.jsx';
import { Button } from '@gc/Button/Button.jsx';
import { useStoreEffect, useStoreState } from '@react-vault';
import cn from './Migration.module.scss';
import { useNavigate } from 'react-router-dom';

export const Migration = () => {
  const navigate = useNavigate();
  const createBackup = useStoreEffect((store) => store.createBackup);
  const runMigrations = useStoreEffect((store) => store.runMigrations);
  // const { currentVersion, latestVersion } = useStoreState((store) => store.migrations);

  const startMigrations = async () => {
    // await createBackup();
    await runMigrations({navigate});
  };


  return (
    <div className={cn.migration}>
      <img src={logoLantstool} alt="Lantstool Logo" className={cn.logo} />
      <div className={cn.content}>

          <>
            <h1 className={cn.title}>Database Update Required</h1>
            <p className={cn.subtitle}>
              A new database version is available. We need to perform an update.
            </p>
            <div className={cn.card}>
              <Card
                icon="history"
                title="Creating backup"
                description="Continue work by creating your backup and runnung migrations."
                action={
                  <Button
                    size="medium"
                    classes={{ button: cn.actionButton }}
                    onClick={startMigrations}
                    color="secondary"
                  >
                    Create backup
                  </Button>
                }
              />
            </div>
          </>
      </div>
    </div>
  );
};
