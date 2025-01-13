import { effect } from '@react-vault';
import { unzipJsonImportFile } from '../../slices/nearProtocol/helpers/unzipJsonImportFile.js';
import { transactionImportSchema } from '../../../ui/components/Space/NearProtocol/Network/Transactions/_general/transactionImportSchema/transactionImportSchema.js';
import { callImportSchema } from '../../../ui/components/Space/NearProtocol/Network/Calls/_general/validations/callImportSchema.js';
import { addToExistingSpace } from './addToExistingSpace.js';
import { createNewSpace } from './createNewSpace.js';
import { matchPath } from 'react-router-dom';

/**
 * if networkId is not testnet/mainnet in the last selected space - show error (temporary solution)
 * if no spaces - create a new one with the name 'Examples'
 * get last active space
 * if no testnet/mainnet - add from preset
 */

const getGithubUrl = (location) => {
  const match = matchPath('/import/gh/:username/:repository/:branch/*', location.pathname);
  if (!match) throw new Error('Invalid URL. Please check it and try again.');

  const { username, repository, branch, '*': path } = match.params;
  return `https://raw.githubusercontent.com/${username}/${repository}/${branch}/${path}`;
};

const validateImportData = async (json) => {
  if (json.transaction) {
    const isValid = await transactionImportSchema.validate({ json });
    if (isValid) return;
  }

  if (json.call) {
    const isValid = await callImportSchema.validate({ json });
    if (isValid) return;
  }

  throw new Error('Invalid imported file');
};

export const importFromGithub = effect(async ({ store, payload }) => {
  const { navigate, location, setError } = payload;
  const [history] = store.getEntities((store) => store.history);

  try {
    // 1. Fetch a zip file from GitHub
    const url = getGithubUrl(location);

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Can't download file from GitHub`);

    const json = await unzipJsonImportFile(response, setError);

    // 2. Validate fetched file
    // Right now we can only have near-protocol testnet/mainnet imported entities
    await validateImportData(json);

    if (json?.networkId !== 'testnet' && json?.networkId !== 'mainnet')
      throw new Error(`
        Cannot import an entity of the '${json.networkId}' network. At this moment the app 
        supports only 'mainnet' and 'testnet' networks.
      `);

    // 3. Import tx or call
    const lastSelectedSpacePath = history.getDestination('/space');
    const handler = lastSelectedSpacePath ? addToExistingSpace : createNewSpace;
    await handler({ json, navigate, lastSelectedSpacePath, store });
  } catch (e) {
    console.log(e);
    setError(e.message);
  }
});
