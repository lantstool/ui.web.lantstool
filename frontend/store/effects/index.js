import { initApp } from './initApp/initApp.js';
import { createBackup } from './createBackup.js';
import { resetApp } from './resetApp.js';
import { resetHistory } from './resetHistory.js';
import { resetAppState } from './resetAppState.js';

export const effects = {
  initApp,
  createBackup,
  resetApp,
  resetHistory,
  resetAppState,
};
