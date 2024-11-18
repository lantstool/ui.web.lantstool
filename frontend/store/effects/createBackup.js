import { format } from 'date-fns';
import { effect } from '@react-vault';

const fetchFileFromOPFS = async (name) => {
  const dirHandle = await navigator.storage.getDirectory();
  const fileHandle = await dirHandle.getFileHandle(name);
  return await fileHandle.getFile();
};

const downloadFile = async (file) => {
  const fileData = await file.arrayBuffer();
  const blob = new Blob([fileData], { type: 'application/octet-stream' });

  const a = document.createElement('a');
  const url = URL.createObjectURL(blob);

  a.href = url;
  a.download = `lantstool-backup-${format(new Date(), 'yyyy-MM-dd_HH-mm-ss')}.sqlite`;

  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

export const createBackup = effect(async () => {
  try {
    const res = await fetchFileFromOPFS('lantstool.sqlite');
    await downloadFile(res);
  } catch (e) {
    console.log(e);
  }
});
