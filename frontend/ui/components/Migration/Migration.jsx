import cn from './Migration.module.scss';
import logoLantstool from '@assets/logoLantstool.svg';
import { Card } from '../GetStarted/Card/Card.jsx';
import { Button } from '@gc/Button/Button.jsx';
import { useToggler } from '@hooks/useToggler.js';
import { useStoreEffect } from '@react-vault';

//TODO
export const Migration = () => {
  const [isOpenBackup, openBackup, closeBackup] = useToggler();
  const createBackup = useStoreEffect((store) => store.createBackup);

  const buckup = () => {};

  return (
    <div className={cn.migration}>
      <img
        src={logoLantstool}
        alt="Lantstool Logo - 3 circles with the app name"
        className={cn.logo}
      />
      <div className={cn.content}>
        <h1 className={cn.title}>Database Update Required</h1>
        <p className={cn.subtitle}>
          A new database version is available. To continue using the app, we need to perform a quick
          migration. A safety backup will be created automatically before we proceed.
        </p>
        <div className={cn.card}>
          <Card
            icon="history"
            title="Creating backup"
            description="Continue work by creating your backup"
            action={
              <Button
                size="medium"
                classes={{ button: cn.actionButton }}
                onClick={createBackup}
                color="secondary"
                IconLeft={() => <span className={cn.historyIcon} />}
              >
                Create backup
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
};
