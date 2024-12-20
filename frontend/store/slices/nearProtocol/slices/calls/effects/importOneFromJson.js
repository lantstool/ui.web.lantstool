import { effect } from '@react-vault';
import { methods } from '../helpers/methods/index.js';
import { config } from '../../../../../../ui/components/Space/NearProtocol/Network/Calls/Call/methods/_general/config.js';

export const importOneFromJson = effect(async ({ store, slice, payload }) => {
  const { spaceId, networkId, formValues, navigate, closeModal } = payload;
  const [backend] = store.getEntities((store) => store.backend);
  const pushOneToList = slice.getActions((slice) => slice.pushOneToList);
  const setNotification = store.getActions((store) => store.setNotification);

  try {
    const { name, method, params } = formValues.json.call;

    const body = {
      method: config.methodNames[method],
      ...methods[method].importTransformer({ params }),
    };

    const call = await backend.sendRequest('nearProtocol.calls.importOne', {
      spaceId,
      networkId,
      name,
      body,
    });

    pushOneToList(call);
    navigate(`${call.callId}`);
    closeModal();

    setTimeout(
      () =>
        setNotification({
          isOpen: true,
          message: 'Call imported successfully',
          variant: 'success',
        }),
      100,
    );
  } catch (e) {
    console.log(e);
  }
});
