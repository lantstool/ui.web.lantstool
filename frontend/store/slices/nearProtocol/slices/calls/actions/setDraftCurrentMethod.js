import { action } from '@react-vault';

export const setDraftCurrentMethod = action(({ slice, payload }) => {
  const { callId, currentMethod, defaultValues } = payload;
  slice.drafts[callId].currentMethod = currentMethod;

  // If we already has the method draft in the state - don't add it again - it
  // would overwrite the unsaved changes when user moves between methods
  if (!slice.drafts[callId][currentMethod]) {
    slice.drafts[callId][currentMethod] = defaultValues;
  }
});
