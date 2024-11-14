import { useStoreEffect } from '@react-vault';
import { useNavigate } from 'react-router-dom';

export const AppSettings = () => {
  const resetApp = useStoreEffect((store) => store.resetApp);
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  const reset = () => resetApp({ navigate });

  return (
    <div>
      <h1> General Setting</h1>
      <button onClick={goBack}>Back</button>
      <button onClick={reset}>Reset App</button>
    </div>
  );
};
