import { useStoreAction, useStoreEffect } from '../../../react-vault/index.js';
import { useEffect, useState, useLayoutEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { usePageVisibility } from 'react-page-visibility';

export const App = () => {
  const onInitApp = useStoreEffect((store) => store.onInitApp);
  const setCurrentLocation = useStoreAction((store) => store.navigation.setCurrentLocation);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [visible, setVisible] = useState(0);
  const isVisible = usePageVisibility()

  useEffect(() => {
    console.log(isVisible);
    if (isVisible) {
      setVisible(v => v + 1);
    }

  }, [isVisible]);


  // console.log(document);
  // useEffect(() => {
  //   (async () => {
  //     await onInitApp({ navigate });
  //     setLoading(false);
  //   })();
  // }, []);

  return loading ? null : (
    <div>
      <p>isVisible: {isVisible.toString()}</p>
      <p>isVisible times: {visible}</p>
      <Outlet />
    </div>
  );
};
