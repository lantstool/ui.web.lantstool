import { fetchJson } from '../../../../../../../../../helpers/fetchJson.js';
import { toCamelCase } from '../../../../../../../../../helpers/toCamelCase.js';

export const viewStatePaginated = async ({ rpc, accountId, nextPageToken = null }) => {
  // Get the latest block ID
  const blockInfo = await rpc.getBlock();
  const blockId = blockInfo.header.height;

  // FastNear method require a specific block_id and doesn't support 'finality': final
  const jsonResponse = await fetchJson('https://read.rpc.fastnear.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 'dontcare',
      method: 'view_state_paginated',
      params: {
        block_id: blockId,
        account_id: accountId,
        next_page_token: nextPageToken,
      },
    }),
  });

  if (jsonResponse?.result?.Ok) return toCamelCase(jsonResponse.result.Ok);
  if (jsonResponse?.error) throw new Error(JSON.stringify(jsonResponse?.error));
  throw new Error(JSON.stringify(jsonResponse));
};
