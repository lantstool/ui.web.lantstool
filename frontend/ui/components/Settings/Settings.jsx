import { useStoreEffect } from '@react-vault';
import { BackButton } from '@gc/BackButton/BackButton.jsx';
import { Button } from '@gc/Button/Button.jsx';
import { ResetAppModal } from './ResetAppModal/ResetAppModal.jsx';
import { ResetHistoryModal } from './ResetHistoryModal/ResetHistoryModal.jsx';
import { useState } from 'react';
import cn from './Settings.module.scss';

export const Settings = () => {
  const createBackup = useStoreEffect((store) => store.createBackup);
  const [isResetApp, setResetApp] = useState(false);
  const [isResetHistory, setResetHistory] = useState(false);

  const openResetApp = () => setResetApp(true);
  const openResetHistory = () => setResetHistory(true);

  return (
    <>
      <div className={cn.settings}>
        <BackButton />
        <div className={cn.content}>
          <h1 className={cn.title}>Settings</h1>
          <div className={cn.container}>
            <div className={cn.wrapper}>
              <p className={cn.subtitle}>Create backup file</p>
              <p className={cn.subtitleLight}>
                This operation will export all your data, including existing spaces and their
                content. You can later restore your data using this backup file.
              </p>
            </div>
            <Button
              color="secondary"
              size="medium"
              iconLeftStyles={cn.exportIcon}
              onClick={createBackup}
            >
              Create Backup
            </Button>
          </div>
          <div className={cn.dangerZone}>
            <h1 className={cn.title}>Danger zone</h1>
            <div className={cn.container}>
              <div className={cn.wrapper}>
                <p className={cn.subtitle}>Reset history</p>
                <p className={cn.subtitleLight}>
                  Do you want to reset the app’s navigation history? This action is useful if you
                  are being redirected incorrectly, and it won’t delete any important data.
                </p>
              </div>
              <Button color="dangerSecondary" size="medium" onClick={openResetHistory}>
                Reset History
              </Button>
            </div>
            <div className={cn.container}>
              <div className={cn.wrapper}>
                <p className={cn.subtitle}>Reset the app</p>
                <p className={cn.subtitleLight}>
                  Are you sure you want to erase all content and start fresh? This action will
                  permanently delete all data.
                </p>
              </div>
              <Button color="danger" size="medium" onClick={openResetApp}>
                Reset App
              </Button>
            </div>
          </div>
        </div>
      </div>
      {isResetApp && <ResetAppModal setResetApp={setResetApp} />}
      {isResetHistory && <ResetHistoryModal setResetHistory={setResetHistory} />}
    </>
  );
};
