import { createStore } from '@react-vault';
import { setNotification } from './actions/setNotification.js';
import { initApp } from './effects/initApp/initApp.js';
import { backend } from './entities/backend.js';
import { history } from './entities/history.js';
import { spaces } from './slices/spaces/spaces.js';
import { nearProtocol } from './slices/nearProtocol/nearProtocol.js';

export const store = createStore({
  notification: {},
  setNotification,
  // entities
  backend,
  history,
  // effects
  initApp,
  // slices
  spaces,
  nearProtocol,
});
