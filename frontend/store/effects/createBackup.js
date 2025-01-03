import { format } from 'date-fns';
import { zipSync } from 'fflate';
import { effect } from '@react-vault';
import { downloadZip } from '../helpers/downloadZip.js';

const fetchFileFromOPFS = async (name) => {
  const dirHandle = await navigator.storage.getDirectory();
  const fileHandle = await dirHandle.getFileHandle(name);
  return await fileHandle.getFile();
};

const createZipFromFile = async (file, name) => {
  const arrayBuffer = await file.arrayBuffer();
  return zipSync(
    {
      [`${name}.sqlite`]: new Uint8Array(arrayBuffer),
    },
    {
      level: 6,
      mtime: Date.now(),
    },
  );
};

export const createBackup = effect(async ({ store }) => {
  const setNotification = store.getActions((store) => store.setNotification);
  const name = `lantstool-backup-${format(new Date(), 'yyyy-MM-dd_HH-mm-ss')}`;

  try {
    const file = await fetchFileFromOPFS('lantstool.sqlite');
    const zip = await createZipFromFile(file, name);
    await downloadZip(zip, name);
    setNotification({ isOpen: true, message: 'Backup created', variant: 'success' });
  } catch (e) {
    console.log(e);
    setNotification({ isOpen: true, message: 'Backup Creation Error', variant: 'error' });
  }
});
