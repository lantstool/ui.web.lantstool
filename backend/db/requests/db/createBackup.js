import { format } from 'date-fns';
import { zipSync } from 'fflate';
import { opfs } from '../helpers/opfs.js';

const createZip = async (backupName, u8DbFile, u8Contracts) => {
  const backup = { [`${backupName}.sqlite`]: u8DbFile };

  u8Contracts.forEach(({ name, file }) => {
    backup[`near-protocol/contracts/${name}`] = file;
  });

  return zipSync(backup, { level: 6, mtime: Date.now() });
};

export const createBackup = async () => {
  const backupName = `lantstool-backup-${format(new Date(), 'yyyy-MM-dd_HH-mm-ss')}`;
  const u8DbFile = await opfs.getU8File({ name: 'lantstool.sqlite' });
  const u8Contracts = await opfs.getDirU8Files({ path: 'near-protocol/contracts' });

  const zip = await createZip(backupName, u8DbFile, u8Contracts);
  return { name: backupName, zip };
};
