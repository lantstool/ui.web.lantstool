import { mixed, object, string } from 'yup';
// import { methods } from '../methods/index.js';


// const paramsImportSchema = object({
//   accountId: string().required(),
// }).concat(blockTargetSchema);

export const callImportSchema = object({
  json: object({
    blockchain: string().required().oneOf(['near-protocol'], 'Unsupported blockchain'),
    networkId: string().required(),
    call: object({
      version: string().required(),
      name: string().required().min(1, 'Length 1 symbols').max(100, 'Length 100 symbols'),
      // method: string().required().oneOf(Object.keys(methods), 'Unsupported method'),
      // params: mixed().when('method', ([method], schema) =>
      //   schema.concat(methods[method]?.paramsImportSchema),
      // ),
    }).required(),
  })
    .json()
    .typeError('Invalid JSON'),
});
