import { sample } from 'lodash';
import { fetchJson } from '../../../../helpers/fetchJson.js';
import { toCamelCase } from '../../../../helpers/toCamelCase.js';

const getRpcParams = (rpcs, rpcUrl) => {
  const headers = { 'Content-Type': 'application/json;charset=utf-8' };

  if (rpcUrl) return { url: rpcUrl, headers };
  // Select a random rpc from the list
  const rpc = sample(rpcs);
  if (rpc.header) headers[rpc.header.name] = rpc.header.value;

  return { url: rpc.url, headers };
};

// We pass responseNameConvention when we want to choose in which format we want
// to see the response - camelCase or stake_case

// We pass rpcUrl in case we want to send request directly to the RPC and
// skip the configure stage. For example - we want to get Genesis Config
// when we set up a network - we don't have any RPC in the list yet
export async function sendRequest({ body, responseNameConvention, rpcUrl }) {
  const { url, headers } = getRpcParams(this.rpcs, rpcUrl);

  const { result, error } = await fetchJson(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 0,
      ...body,
    }),
  });

  if (error) throw new Error(JSON.stringify(error));
  if (responseNameConvention === 'snake_case') return result;
  if (responseNameConvention === 'camelCase') return toCamelCase(result);
}
