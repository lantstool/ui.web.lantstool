import { action } from '@react-vault';

export const setEditorState = action(({ slice, payload }) => {
  const { callId, editorState } = payload;

  slice.results[callId].editorState = editorState;
});
