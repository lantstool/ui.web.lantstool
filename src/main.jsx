import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { store } from './store/store.js';
import { StoreProvider } from './react-vault';
import { router } from './ui/router.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StoreProvider store={store}>
    <RouterProvider router={router} />
  </StoreProvider>,
);
