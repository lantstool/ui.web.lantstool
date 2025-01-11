import { object, string } from 'yup';
/**
 * deployContractSchema is a Yup schema designed for validating an object
 * representing a "DeployContract" action. It checks the following fields:
 *
 * 1. type:
 *    - Must be a required string.
 *    - Typically denotes the action type ("DeployContract").
 *
 * 2. fileName:
 *    - Must be a defined string (it can be empty or non-empty).
 *
 * 3. base64File:
 *    - Must be a defined string.
 *    - If fileName is an empty string (""), base64File must also be empty.
 *    - If fileName is non-empty, base64File must be a valid Base64 string
 *      (verified using base64Regex).
 *
 */

const base64Regex = /^[A-Za-z0-9+/]+={0,2}$/;

export const deployContractSchema = object({
  type: string().required(),
  fileName: string().defined(),
  base64File: string()
    .defined()
    .when('fileName', {
      is: (fileNameVal) => fileNameVal === '',
      then: () => string().oneOf([''], 'If fileName is empty, base64File must be empty'),
      otherwise: () =>
        string().test(
          'isBase64',
          'base64File must be a valid base64 string when fileName is non-empty',
          (value) => {
            if (!value) return false;
            return base64Regex.test(value);
          },
        ),
    }),
});
