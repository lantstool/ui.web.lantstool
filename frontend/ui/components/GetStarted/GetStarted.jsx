import { Button } from '../_general/Button/Button.jsx';
import { RestoreFromBackup } from './RestoreFromBackup/RestoreFromBackup.jsx';
import { useToggler } from '@hooks/useToggler.js';
import { Card } from './Card/Card.jsx';
import logoLantstool from '@assets/logoLantstool.svg';
import cn from './GetStarted.module.scss';
import { useState } from 'react';
import { GetStartedForm } from './GetStartedForm/GetStartedForm.jsx';

export const GetStarted = () => {
  const [isOpenBackup, openBackup, closeBackup] = useToggler();
  const [step, setStep] = useState('getStarted');

  const changeStep = () => setStep('createSpace');

  return (
    <>
      <div className={cn.getStarted}>
        {step === 'getStarted' ? (
          <>
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
                    <Button
                      onClick={changeStep}
                      size="medium"
                      classes={{ button: cn.actionButton }}
                    >
                      Get started
                    </Button>
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
                      IconLeft={() => <span className={cn.historyIcon} />}
                    >
                      Restore backup
                    </Button>
                  }
                />
              </div>
            </div>
          </>
        ) : (
          <GetStartedForm step={step} setStep={setStep} />
        )}
      </div>
      {isOpenBackup && <RestoreFromBackup closeModal={closeBackup} />}
    </>
  );
};
