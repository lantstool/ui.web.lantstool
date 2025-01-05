import { setupDatabase } from '../../setupDatabase/setupDatabase.js';
import { closeConnection } from './closeConnection.js';
import { deleteDbFiles } from './helpers/deleteDbFiles.js';
import { opfs } from '../helpers/opfs.js';

export const reset = async ({ db }) => {
  await closeConnection({ db });
  await deleteDbFiles('lantstool.sqlite');
  await opfs.removeEntry({ name: 'near-protocol' });
  await setupDatabase({ db });
};
