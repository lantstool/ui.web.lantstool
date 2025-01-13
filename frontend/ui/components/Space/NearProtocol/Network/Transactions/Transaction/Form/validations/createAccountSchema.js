import { object, string } from 'yup';

const SUB_ACCOUNT_ID_REGEX = /^[A-Za-z0-9_-]+$/;

const validateSubAccountId = (accountId) =>
  accountId.length >= 1 && accountId.length <= 64 && SUB_ACCOUNT_ID_REGEX.test(accountId);

export const createAccountSchema = object({
  type: string().required(),
  subAccountId: string()
    .required()
    .test('is-valid-near-protocol-sub-account', `Invalid sub-account format`, (value) => {
      return validateSubAccountId(value);
    }),
});
