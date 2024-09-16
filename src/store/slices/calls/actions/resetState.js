import { action } from '../../../../react-vault/index.js';

export const resetState = action(({ slice }) => {
  slice.ids = [];
  slice.records = {};
  slice.temporaryFormValues = {};
  slice.isCallsLoadedToState = false;
});
