import { createStore } from '../../react-vault/index.js';
import { initApp } from './effects/initApp.js';
import { getAccessKeyList } from './effects/getAccessKeyList';
import { backend } from './entities/backend.js';
import { spaces } from './slices/spaces/spaces.js';
import { nearProtocol } from './slices/nearProtocol/nearProtocol.js';

export const store = createStore({
  // entities
  backend,
  // effects
  initApp,
  getAccessKeyList,
  // slices
  spaces,
  nearProtocol,
});
