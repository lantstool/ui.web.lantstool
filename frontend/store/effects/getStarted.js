import { effect } from '@react-vault';

export const getStarted = effect(async ({ store, payload }) => {
  const { formValues, navigate, setError } = payload;
  const { networkCreateType } = formValues;
  const createManuallyNetwork = store.getEffects((store) => store.createManuallyNetwork);
  const createFromPresetNetwork = store.getEffects((store) => store.createFromPresetNetwork);
  const setNotification = store.getActions((store) => store.setNotification);

  try {
    if (networkCreateType === 'addManually') {
      await createManuallyNetwork({ formValues, navigate });
    }

    if (networkCreateType === 'selectPredefined') {
      await createFromPresetNetwork({ formValues, navigate });
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
