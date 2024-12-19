import { createStore } from '@react-vault';
// actions
import { setNotification } from './actions/setNotification.js';
import { resetState } from './actions/resetState.js';
// effects
import { effects } from './effects/index.js';
// entities
import { backend } from './entities/backend.js';
import { history } from './entities/history.js';
import { tabMessenger } from './entities/tabMessenger.js';
// slices
import { spaces } from './slices/spaces/spaces.js';
import { nearProtocol } from './slices/nearProtocol/nearProtocol.js';

export const store = createStore({
  // state
  notification: {},
  // actions
  setNotification,
  resetState,
  // effects
  ...effects,
  // entities
  backend,
  history,
  tabMessenger,
  // slices
  spaces,
  nearProtocol,
});
