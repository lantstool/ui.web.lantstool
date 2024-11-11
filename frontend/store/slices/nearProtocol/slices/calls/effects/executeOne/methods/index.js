import { account } from './account/index.js';
import { contract } from './contract/index.js';
import { keys } from './keys/index.js';
import { block } from './block/index.js';
import { transactions } from './transactions/index.js';

export const methods = {
  ...account,
  ...contract,
  ...keys,
  ...block,
  ...transactions,
};
