import { action } from '@react-vault';

export const setEditorState = action(({ slice, payload }) => {
  const { transactionId, editorState } = payload;

  slice.results[transactionId].editorState = editorState;
});
