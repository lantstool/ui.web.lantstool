import { toBase64 } from '../../../../../../helpers/toBase64.js';

export const DeployContract = async (formAction, store) => {
  const defaultValue = {
    type: formAction.type,
    fileName: '',
    base64File: '',
  };

  if (!formAction.fileName) return defaultValue;

  const [backend] = store.getEntities((store) => store.backend);
  const setNotification = store.getActions((store) => store.setNotification);

  try {
    const u8Contract = await backend.sendRequest('nearProtocol.transactions.getU8Contract', {
      fileName: formAction.fileName,
    });

    return {
      type: formAction.type,
      fileName: formAction.fileName,
      base64File: toBase64(u8Contract),
    };
  } catch (e) {
    console.log(e);
    setNotification({
      isOpen: true,
      message: "Can't transform the contract wasm",
      variant: 'error',
    });
    return defaultValue;
  }
};
