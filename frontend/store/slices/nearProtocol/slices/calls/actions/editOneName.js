import { action } from '@react-vault';

export const editOneName = action(({ slice, payload }) => {
  const { callId, name } = payload;

  const call = slice.list.find((c) => c.callId === callId);
  call.name = name;
});
