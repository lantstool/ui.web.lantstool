import { createOne } from './createOne.js';
import { getCount } from './getCount.js';
import { getList } from './getList.js';
import { onMountCall } from './onMountCall.js';
import { reorder } from './reorder.js';
import { removeOne } from './removeOne.js';
import { duplicateOne } from './duplicateOne.js';
import { updateOneName } from './updateOneName.js';
import { revertChanges } from './revertChanges.js';
import { saveChanges } from './saveChanges.js';
import { executeOne } from './executeOne.js';
import { importOneFromJson } from './importOneFromJson.js';
import { exportOneAsJson } from './exportOneAsJson.js';
import { exportOneAsZip } from './exportOneAsZip.js';

export const effects = {
  getList,
  reorder,
  getCount,
  createOne,
  onMountCall,
  updateOneName,
  duplicateOne,
  revertChanges,
  saveChanges,
  removeOne,
  executeOne,
  importOneFromJson,
  exportOneAsJson,
  exportOneAsZip,
};
