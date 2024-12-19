import { action } from '@react-vault';

export const setNotification = action(({ slice, payload }) => {
  slice.notification = { ...slice.notification, delay: 1500, ...payload };
});
