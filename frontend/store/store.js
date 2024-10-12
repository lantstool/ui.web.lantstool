import { createStore } from '../../react-vault/index.js';
import { initApp } from './effects/initApp/initApp.js';
import { backend } from './entities/backend.js';
import { spaces } from './slices/spaces/spaces.js';
import { nearProtocol } from './slices/nearProtocol/nearProtocol.js';

export const store = createStore({
  // entities
  backend,
  // effects
  initApp,
  // slices
  spaces,
  nearProtocol,
});
