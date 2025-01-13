import { object, string } from 'yup';

/**
 * 3. Schema for "Transfer":
 *    - type: "Transfer"
 *    - quantity: an object { amount: string, unit: "NEAR" | "yoctoNEAR" }
 */

export const transferSchema = object({
  type: string().required(),
  quantity: object({
    amount: string().defined(),
    unit: string().required().oneOf(['NEAR', 'yoctoNEAR']),
  }).required(),
});
