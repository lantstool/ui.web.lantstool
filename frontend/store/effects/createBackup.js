import { format } from 'date-fns';
import { zipSync } from 'fflate';
import { effect } from '@react-vault';

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

const downloadZip = async (zipped, name) => {
  const blob = new Blob([zipped], { type: 'application/zip' });

  const a = document.createElement('a');
  const url = URL.createObjectURL(blob);

  a.href = url;
  a.download = `${name}.zip`;

  a.click();
  a.remove();
  URL.revokeObjectURL(url);
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
