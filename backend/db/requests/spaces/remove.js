import { addPrefixToObjKeys } from '../helpers/addPrefixToObjKeys.js';
import { getAll as getAllNetworks } from '../nearProtocol/networks/getAll.js';
import { removeOne as removeNetwork } from '../nearProtocol/networks/removeOne.js';

const removeAllNetworks = async (execute, spaceId) => {
  const list = await getAllNetworks({ execute, request: { body: { spaceId } } });

  for (const { networkId } of list) {
    await removeNetwork({ execute, request: { body: { spaceId, networkId } } });
  }
};

export const remove = async ({ execute, request }) => {
  const { spaceId } = request.body;
  await removeAllNetworks(execute, spaceId);

  const query = `
    DELETE FROM spaces
    WHERE spaceId = @spaceId;
  `;
  await execute(query, addPrefixToObjKeys(request.body));
};
