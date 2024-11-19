import { setupDatabase } from '../../setupDatabase/setupDatabase.js';
import { closeConnection } from './closeConnection.js';
import { deleteDbFiles } from './helpers/deleteDbFiles.js';

export const reset = async ({ db }) => {
  await closeConnection({ db });
  await deleteDbFiles('lantstool.sqlite');
  await setupDatabase({ db });
};
