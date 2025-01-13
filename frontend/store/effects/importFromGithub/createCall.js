import { config } from '../../../ui/components/Space/NearProtocol/Network/Calls/Call/methods/_general/config.js';
import { methods } from '../../slices/nearProtocol/slices/calls/helpers/methods/index.js';

export const createCall = async ({
  json,
  backend,
  networkId,
  spaceId,
  navigate,
  setNotification,
}) => {
  const { name, method, params } = json.call;

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

  navigate(`/space/${spaceId}/near-protocol/${networkId}/calls/${call.callId}`, {
    relative: 'path',
    replace: true,
  });

  setTimeout(
    () =>
      setNotification({
        isOpen: true,
        message: 'Call imported successfully',
        variant: 'success',
      }),
    100,
  );
};
