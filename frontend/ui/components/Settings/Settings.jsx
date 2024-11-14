import { useStoreEffect } from '@react-vault';
import { useNavigate } from 'react-router-dom';

export const Settings = () => {
  const resetApp = useStoreEffect((store) => store.resetApp);
  const resetHistory = useStoreEffect((store) => store.resetHistory);
  const createBackup = useStoreEffect((store) => store.createBackup);
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  const clearApp = () => resetApp({ navigate });
  const clearHistory = () => resetHistory({ navigate });

  return (
    <div>
      <h1> General Setting</h1>
      <button onClick={goBack}>Back</button>
      <button onClick={createBackup}>Create Backup</button>
      <button onClick={clearApp}>Reset App</button>
      <button onClick={clearHistory}>Reset History</button>
    </div>
  );
};
