import { array, object, string } from 'yup';

/**
 * Validates the Account ID according to the NEAR protocol
 * [Account ID rules](https://nomicon.io/DataStructures/Account#account-id-rules).
 *
 * @param accountId - The Account ID string you want to validate.
 */

const ACCOUNT_ID_REGEX = /^(([a-z\d]+[-_])*[a-z\d]+\.)*([a-z\d]+[-_])*[a-z\d]+$/;

const validateAccountId = (accountId) =>
  accountId.length >= 2 && accountId.length <= 64 && ACCOUNT_ID_REGEX.test(accountId);

export const accountId = (name = 'Account ID') =>
  string()
    .required(`${name} is a required field`)
    .test('is-valid-near-protocol-account', `Invalid ${name} format`, (value) =>
      validateAccountId(value),
    );

export const accountIdDropdown = (name = 'Account ID') =>
  object({
    value: accountId(name),
  }).required(`${name} is a required field`);

export const accountIdsDropdown = array().of(
  object({
    accountId: accountIdDropdown('Account ID'),
  }),
);
