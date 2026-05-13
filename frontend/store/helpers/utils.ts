import { utils } from 'near-api-js';

export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getFormattedJSON = (json: unknown): string => JSON.stringify(json, null, 2);

export const formatNumber = (number: string): string => {
  const formatNearAmount = utils.format.formatNearAmount(number);
  return formatNearAmount.toString().replace(/(\.\d{5})\d*$/, '$1');
};

export const sanitizeFilename = (name: string): string =>
  name
    .trim()
    .replace(/[^a-zA-Z0-9 \-_]/g, '') // Remove all except letters, digits, spaces, -, _
    .replace(/\s+/g, '-') // Replace spaces with -
    .toLowerCase();

export const generateHashFromBytes = async (
  bytes: Uint8Array<ArrayBuffer> | ArrayBuffer,
  length: number = 8,
): Promise<string> => {
  const hashBuffer = await crypto.subtle.digest('SHA-256', bytes); // Create hash
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert ArrayBuffer into bytes array
  return hashArray
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
    .substring(0, length); // cut hash length
};
