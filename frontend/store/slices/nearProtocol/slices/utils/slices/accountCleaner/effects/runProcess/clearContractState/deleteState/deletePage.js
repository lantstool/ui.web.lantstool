import { viewStatePaginated } from '../viewStatePaginated.js';
import { deleteChunk } from './deleteChunk.js';
import { splitPageIntoChunks } from './splitPageIntoChunks.js';

export const deletePage = async ({
  state,
  rpc,
  logger,
  signerId,
  signerPublicKey,
  spaceId,
  networkId,
}) => {
  const [page, protocolConfig] = await Promise.all([
    viewStatePaginated({
      accountId: signerId,
      rpc,
      nextPageToken: state.nextPageToken,
    }),
    rpc.getProtocolConfig(),
  ]);

  state.nextPageToken = page.nextPageToken;
  const chunks = splitPageIntoChunks(page, protocolConfig);

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const keys = chunk.entries.map(({ key }) => key);

    const from = state.startDeletionFrom;
    const to = from + keys.length - 1;

    logger.info(`Deleting key-value pairs ${from}-${to}...`);

    await deleteChunk({
      rpc,
      keys,
      signerId,
      signerPublicKey,
      spaceId,
      networkId,
      logger,
    });

    state.startDeletionFrom = state.startDeletionFrom + keys.length;
  }
};
