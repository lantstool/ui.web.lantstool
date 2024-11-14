import { useStoreEffect } from '@react-vault';
import { useNavigate } from 'react-router-dom';

export const AppSettings = () => {
  const resetApp = useStoreEffect((store) => store.resetApp);
  const resetHistory = useStoreEffect((store) => store.resetHistory);
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  const clearApp = () => resetApp({ navigate });
  const clearHistory = () => resetHistory({ navigate });

  return (
    <div>
      <h1> General Setting</h1>
      <button onClick={goBack}>Back</button>
      <button onClick={clearApp}>Reset App</button>
      <button onClick={clearHistory}>Reset History</button>
    </div>
  );
};
