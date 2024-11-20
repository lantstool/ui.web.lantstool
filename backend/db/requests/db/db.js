import { closeConnection } from './closeConnection.js';
import { reset } from './reset.js';
import { restoreFromBackup } from './restoreFromBackup.js';

export const db = {
  closeConnection,
  reset,
  restoreFromBackup,
};
