import { effect } from '@react-vault';
import { downloadZip } from '../helpers/downloadZip.js';

export const createBackup = effect(async ({ store }) => {
  const setNotification = store.getActions((store) => store.setNotification);
  const [backend] = store.getEntities((store) => store.backend);

  try {
    const { zip, name } = await backend.sendRequest('db.createBackup');
    await downloadZip(zip, name);
    setNotification({ isOpen: true, message: 'Backup created', variant: 'success' });
  } catch (e) {
    console.log(e);
    setNotification({ isOpen: true, message: 'Backup Creation Error', variant: 'error' });
  }
});
