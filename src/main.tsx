import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './ui/components/App.tsx';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { store } from './store/store.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { StoreProvider } from './react-vault';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <StoreProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreProvider>
  </>,
);
