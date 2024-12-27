import { object, string } from 'yup';
import bs58 from 'bs58';

export const publicKey = string()
  .required(`Public Key is a required field`)
  .test('isEd25519', 'Invalid Public Key format',(value) => {
    // Check if the string starts with "ed25519:"
    if (!value.startsWith('ed25519:')) return false;
    // Extract the base58 portion after the prefix
    const rawKey = value.slice('ed25519:'.length);
    try {
      const decoded = bs58.decode(rawKey);
      // NEAR ed25519 keys must be exactly 32 bytes after decoding
      return decoded.length === 32;
    } catch (err) {
      // If decoding fails, the key format is invalid
      return false;
    }
  });

export const publicKeyDropdown = object({
  value: publicKey,
}).required('Public Key is a required field');
