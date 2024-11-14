import { createStore } from '@react-vault';
import { setNotification } from './actions/setNotification.js';
import { resetState } from './actions/resetState.js';
import { initApp } from './effects/initApp/initApp.js';
import { resetApp } from './effects/resetApp.js';
import { backend } from './entities/backend.js';
import { history } from './entities/history.js';
import { spaces } from './slices/spaces/spaces.js';
import { nearProtocol } from './slices/nearProtocol/nearProtocol.js';

export const store = createStore({
  // state
  notification: {},
  // actions
  setNotification,
  resetState,
  // entities
  backend,
  history,
  // effects
  initApp,
  resetApp,
  // slices
  spaces,
  nearProtocol,
});
