import { object, string } from 'yup';

export const transactionImportSchema = object({
  json: object({
    blockchain: string().required().oneOf(['near-protocol']),
    networkId: string().required(),
    transaction: object({
      version: string().required(),
      name: string().required().min(1, 'Length 1 symbols').max(100, 'Length 100 symbols'),
      // method: string().required().oneOf(Object.keys(methods), 'Unsupported method'),
      // params: object().when('method', ([method], schema) => {
      //   if (method) return schema.concat(methodParams[method]);
      // }),
    }).required(),
  })
    .json()
    .typeError('Invalid JSON'),
});
