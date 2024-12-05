import { object, string } from 'yup';

export const schema = object({
  receiptId: string().required('Receipt Id is a mandatory field'),
});
