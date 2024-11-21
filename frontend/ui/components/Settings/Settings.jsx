import { useStoreEffect } from '@react-vault';
import { useNavigate } from 'react-router-dom';
import { Button } from '../_general/Button/Button.jsx';
import { ExportLinear } from '../_general/icons/ExportLinear.jsx';
import {Label} from '../_general/Label/Label.jsx';
import cn from './Settings.module.scss';

export const Settings = () => {
  const resetApp = useStoreEffect((store) => store.resetApp);
  const resetHistory = useStoreEffect((store) => store.resetHistory);
  const createBackup = useStoreEffect((store) => store.createBackup);
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  const clearApp = () => resetApp({ navigate });
  const clearHistory = () => resetHistory({ navigate });

  return (
    <>
      <button className={cn.backBtn} onClick={goBack}>Back</button>
      <Label color='green'>
        My color
      </Label>
      <div className={cn.settings}>
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
          <div className={cn.container}>
            <div className={cn.wrapper}>
              <p className={cn.subtitle}>Reset the app</p>
              <p className={cn.subtitleLight}>
                If you encounter technical issues or want to erase all content, you can reset it,
                but all data will be lost forever.
              </p>
            </div>
            <Button color="danger" size="medium" onClick={clearApp}>
              Reset App
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
            <Button color="danger" size="medium" onClick={clearHistory}>
              Reset History
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
