import { object, string } from 'yup';

/**
 * 1. Schema for CreateAccount:
 *    - type: "CreateAccount"
 *    - subAccountId: a string (can be empty or any other string)
 */
export const createAccountSchema = object({
  type: string().required(),
  subAccountId: string().defined(), // allows "" or any string
});
