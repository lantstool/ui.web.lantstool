import { config } from '../../../ui/components/Space/NearProtocol/Network/Calls/Call/methods/_general/config.js';
import { methods } from '../../slices/nearProtocol/slices/calls/helpers/methods/index.js';

const getVersionedTransformer = (method, version) =>
  methods[method].importTransformers
    ? methods[method].importTransformers[version]
    : methods[method].importTransformer;

export const createCall = async ({
  json,
  backend,
  networkId,
  spaceId,
  navigate,
  setNotification,
}) => {
  const { name, method, params, version } = json.call;

  const transformer = getVersionedTransformer(method, version);

  const body = {
    method: config.methodNames[method],
    ...transformer({ params }),
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
