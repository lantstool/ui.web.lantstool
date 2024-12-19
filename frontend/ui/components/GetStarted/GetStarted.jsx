import { Button } from '../_general/Button/Button.jsx';
import { Link } from 'react-router-dom';
import { RestoreFromBackup } from './RestoreFromBackup/RestoreFromBackup.jsx';
import { useToggler } from '@hooks/useToggler.js';
import { Card } from './Card/Card.jsx';
import logoLantstool from '@assets/logoLantstool.svg';
import cn from './GetStarted.module.scss';

export const GetStarted = () => {
  const [isOpenBackup, openBackup, closeBackup] = useToggler();

  return (
    <>
      <div className={cn.getStarted}>
        <img
          src={logoLantstool}
          alt="Lantstool Logo - 3 circles with the app name"
          className={cn.logo}
        />
        <div className={cn.content}>
          <h1 className={cn.title}>Welcome to Lantstool!</h1>
          <div className={cn.cards}>
            <Card
              icon="handShake"
              title="I am a new user"
              description="Start from scratch and create your first space"
              action={
                <Link to="/spaces/create" className={cn.action}>
                  <Button size="medium" classes={{ button: cn.actionButton }}>
                    Get started
                  </Button>
                </Link>
              }
            />
            <Card
              icon="history"
              title="I have the app backup"
              description="Continue work by restoring all your data at once"
              action={
                <Button
                  size="medium"
                  classes={{ button: cn.actionButton }}
                  onClick={openBackup}
                  color="secondary"
                  IconLeft={() => <span className={cn.historyIcon}/>}
                >
                  Restore backup
                </Button>
              }
            />
          </div>
        </div>
      </div>
      {isOpenBackup && <RestoreFromBackup closeModal={closeBackup} />}
    </>
  );
};
