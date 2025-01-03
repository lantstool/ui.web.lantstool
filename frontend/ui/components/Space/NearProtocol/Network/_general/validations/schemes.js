import { array, object, string } from 'yup';
import { accountId, accountIdDropdown, accountIdsDropdown } from './accountId.js';
import { publicKey, publicKeyDropdown } from './publicKey.js';
import { blockId, targetBlockId } from './blockId.js';

const hash = (name) => string()
  .required(`${name} is a required field`)
  .length(44, `${name} must be exactly 44 characters long`)
  .test('isValidHash', `Invalid ${name} format`, (value) => {
    if (!value) return false;
    return /^[A-Za-z0-9]+$/.test(value); // Check: is it a base58 string (block hash)?
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
