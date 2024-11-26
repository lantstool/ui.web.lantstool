import { sample } from 'lodash';
import { fetchJson } from '../../../../helpers/fetchJson.js';
import { toCamelCase } from '../../../../helpers/toCamelCase.js';

const rpcError = (error) => {
  const e = new Error();
  e.message = JSON.stringify(error);
  e.rpc = error;
  return e;
};

const getRpcParams = (rpcs) => {
  const rpc = sample(rpcs); // Select a random rpc from the list
  const headers = { 'Content-Type': 'application/json;charset=utf-8' };

  rpc.headers.forEach((header) => {
    headers[header.name] = header.value;
  });

  return { url: rpc.url, headers };
};

// We pass responseNameConvention when we want to choose in which format we want
// to see the response - camelCase or stake_case

// We pass rpcUrl in case we want to send request directly to the RPC and
// skip the configure stage. For example - we want to get Genesis Config
// when we set up a network - we don't have any RPC in the list yet
export async function sendRequest({ body, responseNameConvention }) {
  const { url, headers } = getRpcParams(this.rpcs);

  const { result, error } = await fetchJson(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 0,
      ...body,
    }),
  });

  if (error) throw rpcError(error);
  if (responseNameConvention === 'snake_case') return result;
  if (responseNameConvention === 'camelCase') return toCamelCase(result);
}
