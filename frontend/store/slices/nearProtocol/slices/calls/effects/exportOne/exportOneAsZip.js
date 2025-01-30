import { effect } from '@react-vault';
import { getFormattedJSON } from '../../../../../../helpers/utils.js';
import { methods } from '../../helpers/methods/index.js';
import { downloadZip } from '../../../../../../helpers/downloadZip.js';
import { createZipFromJsonString } from '../../../../helpers/createZipFromJsonString.js';

export const exportOneAsZip = effect(async ({ store, payload }) => {
  const { origin: call, form, closeModal } = payload;
  const setNotification = store.getActions((store) => store.setNotification);

  try {
    const method = form.getValues().method.value;
    const json = getFormattedJSON(methods[method].exportTransformer({ call, form }));

    const { name, zip } = await createZipFromJsonString(json, call.name);
    await downloadZip(zip, name);

    closeModal();
    setNotification({ isOpen: true, message: 'Call exported successfully', variant: 'success' });
  } catch (e) {
    console.log(e);
    setNotification({ isOpen: true, message: 'Call export error', variant: 'error' });
  }
});
