import { KEY_DERIVATION_PATH } from 'near-seed-phrase';
import { actions } from './actions/index.js';
import { effects } from './effects/index.js';

export const utils = {
  generatedKey: {
    publicKey: '',
    privateKey: '',
    seedPhrase: '',
    derivationPath: KEY_DERIVATION_PATH,
  },
  ...actions,
  ...effects,
};
