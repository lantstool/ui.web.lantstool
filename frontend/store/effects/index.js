import { initApp } from './initApp/initApp.js';
import { createBackup } from './createBackup.js';
import { restoreFromBackup } from './restoreFromBackup.js';
import { resetApp } from './resetApp.js';
import { resetHistory } from './resetHistory.js';
import { resetAppState } from './resetAppState.js';

export const effects = {
  initApp,
  createBackup,
  restoreFromBackup,
  resetApp,
  resetHistory,
  resetAppState,
};
