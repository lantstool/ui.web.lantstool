import { create } from './create.js';
import { getCount } from './getCount.js';
import { getList } from './getList.js';
import { reorder } from './reorder.js';
import { removeOne } from './removeOne.js';
import { duplicateOne } from './duplicateOne.js';
import { updateOneName } from './updateOneName.js';
import { sendOne } from './sendOne/sendOne.js';
import { revertChanges } from './revertChanges.js';
import { saveChanges } from './saveChanges.js';
import { onMountTransaction } from './onMountTransaction.js';
import { uploadContract } from './uploadContract.js';
import { exportOneAsJson } from './exportOne/exportOneAsJson.js';
import { exportOneAsZip } from './exportOne/exportOneAsZip.js';
import { importOneFromJson } from './importOne/importOneFromJson.js';
import { importOneFromZip } from './importOne/importOneFromZip.js';

export const effects = {
  getList,
  reorder,
  getCount,
  create,
  sendOne,
  updateOneName,
  duplicateOne,
  revertChanges,
  saveChanges,
  removeOne,
  onMountTransaction,
  uploadContract,
  exportOneAsJson,
  exportOneAsZip,
  importOneFromJson,
  importOneFromZip,
};
