import bs58 from 'bs58';
import { string } from 'yup';

const blockHeightRegex = /^(0|[1-9]\d*)$/;
const base58Regex = /^[1-9A-HJ-NP-Za-km-z]+$/;

export const blockId = string()
  .required('Block ID is a required field')
  .test('isBlockHeightOrHash', 'Invalid Block ID', (value) => {
    if (!value) return false;
    // 1. Check for block height (digits only)
    if (blockHeightRegex.test(value)) return true;
    // 2. Check for correct alphabet
    if (!base58Regex.test(value)) return false;
    try {
      // 3. Check is value are 32 bytes after decoding
      return bs58.decode(value).length === 32;
    } catch {
      // If decoding fails, the value format is invalid
      return false;
    }
  });

export const targetBlockId = string().when('blockTarget', {
  is: 'specific',
  then: () => blockId,
  otherwise: () => string().notRequired(),
});
