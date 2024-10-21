import { effect } from '@react-vault';

export const executeOne = effect(async ({ store, payload }) => {
  try {
    console.log(payload);
  } catch (e) {
    console.log(e);
  }
});
