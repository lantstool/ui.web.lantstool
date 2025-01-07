import { effect } from '@react-vault';
import { createManuallyNetwork } from './createManuallyNetwork.js';
import { createFromPresetNetwork } from './createFromPresetNetwork.js';

export const getStarted = effect(async ({ store, payload }) => {
  const { formValues, navigate, setError } = payload;
  const { networkCreateType } = formValues;
  const setNotification = store.getActions((store) => store.setNotification);

  try {
    if (networkCreateType === 'addManually') {
      await createManuallyNetwork({ store, formValues, navigate });
    }

    if (networkCreateType === 'selectPredefined') {
      await createFromPresetNetwork({ store, formValues, navigate });
    }
  } catch (e) {
    console.log(e);
    if (networkCreateType === 'addManually') {
      setNotification({ isOpen: true, message: e.message, variant: 'error', delay: 2500 });
    } else {
      setError('rpc', { type: 500, message: e.message });
    }
  }
});
