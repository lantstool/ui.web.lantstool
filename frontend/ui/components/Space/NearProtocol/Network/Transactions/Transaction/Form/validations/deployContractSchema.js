import { object, string } from 'yup';

export const deployContractSchema = object({
  fileName: string().required(),
});
