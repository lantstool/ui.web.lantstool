import { closeConnection } from './closeConnection.js';
import { reset } from './reset.js';
import { restoreFromBackup } from './restoreFromBackup/restoreFromBackup.js';
import { createBackup } from './createBackup.js';
import { checkMigrations } from './checkMigrations.js';
import { runMigrations } from './runMigrations.js';

export const db = {
  closeConnection,
  reset,
  restoreFromBackup,
  createBackup,
  runMigrations,
  checkMigrations,
};
