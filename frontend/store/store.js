import { createStore } from '@react-vault';
// actions
import { actions } from './actions/index.js';
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
  ...actions,
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
