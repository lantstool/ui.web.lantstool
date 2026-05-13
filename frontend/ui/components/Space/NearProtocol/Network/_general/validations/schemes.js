import bs58 from 'bs58';
import { array, object, string } from 'yup';
import { accountId, accountIdDropdown, accountIdsDropdown } from './accountId.js';
import { publicKey, publicKeyDropdown } from './publicKey.js';
import { blockId, targetBlockId } from './blockId.js';

const base58Regex = /^[1-9A-HJ-NP-Za-km-z]+$/;

const hash = (name) =>
  string()
    .required(`${name} is a required field`)
    .test('isValidHash', `Invalid ${name} format`, (value) => {
      if (!value) return false;
      // 1. Check for correct alphabet
      if (!base58Regex.test(value)) return false;
      try {
        // 2. Check is value are 32 bytes after decoding
        return bs58.decode(value).length === 32;
      } catch {
        // If decoding fails, the value format is invalid
        return false;
      }
    });

const contractIdsDropdown = array().of(
  object({
    contractId: accountIdDropdown('Contract ID'),
  }),
);

export const schemes = {
  accountId,
  accountIdDropdown,
  accountIdsDropdown,
  contractIdsDropdown,
  blockId,
  targetBlockId,
  publicKey,
  publicKeyDropdown,
  hash,
};
