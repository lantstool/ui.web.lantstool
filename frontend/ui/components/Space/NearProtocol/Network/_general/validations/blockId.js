import { string } from 'yup';

export const blockId = string()
  .max(44)
  .required('Block ID is a required field')
  .test('isBlockHeightOrHash', 'Invalid Block ID', (value) => {
    if (!value) return false;
    // Check: is it only digits (block height)?
    const isNumeric = /^\d+$/.test(value);
    if (isNumeric) return true;
    // Check: is it a base58 string (block hash)?
    return /^[A-Za-z0-9]+$/.test(value);
  });

export const targetBlockId = string().when('blockTarget', {
  is: 'specific',
  then: () => blockId,
  otherwise: () => string().notRequired(),
});
