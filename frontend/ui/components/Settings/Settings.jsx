import { useStoreEffect } from '@react-vault';
import { BackButton } from '../_general/BackButton/BackButton.jsx';
import { Button } from '../_general/Button/Button.jsx';
import { ExportLinear } from '../_general/icons/ExportLinear.jsx';
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
          <h1 className={cn.title}>Setting</h1>
          <div className={cn.container}>
            <div className={cn.wrapper}>
              <p className={cn.subtitle}>Create backup file</p>
              <p className={cn.subtitleLight}>
                This will export all data including existing spaces with their content. Then you
                will be able to restore your content from this file.
              </p>
            </div>
            <Button color="secondary" size="medium" IconLeft={ExportLinear} onClick={createBackup}>
              Create Backup
            </Button>
          </div>
          <div className={cn.dangerZone}>
            <h1 className={cn.title}>Danger zone</h1>
            <div className={cn.container}>
              <div className={cn.wrapper}>
                <p className={cn.subtitle}>Reset history</p>
                <p className={cn.subtitleLight}>
                  Reset the app navigation history if the app redirects you incorrectly. Don’t
                  worry, this won’t delete any important data.
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
                  If you encounter technical issues or want to erase all content, you can reset it,
                  but all data will be lost forever.
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
