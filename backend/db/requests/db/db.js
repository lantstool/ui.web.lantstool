import { closeConnection } from './closeConnection.js';
import { reset } from './reset.js';
import { restoreFromBackup } from './restoreFromBackup.js';
import { createBackup } from './createBackup.js';

export const db = {
  closeConnection,
  reset,
  restoreFromBackup,
  createBackup,
};
