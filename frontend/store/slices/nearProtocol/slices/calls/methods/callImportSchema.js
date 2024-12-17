import { object, string } from 'yup';
import { methods } from './index.js';

export const callImportSchema = object({
  json: object({
    blockchain: string().required().oneOf(['near-protocol'], 'Unsupported blockchain'),
    networkId: string().required(),
    call: object({
      version: string()
        .required()
        .matches(/^\d+\.\d+$/, 'Version must be in the format "x.x"'),
      name: string().required().min(1, 'Length 1 symbols').max(100, 'Length 100 symbols'),
      method: string().required().oneOf(Object.keys(methods), 'Unsupported method'),
      params: object().when('method', ([method], schema) => {
        console.log(method);
        return object({
          accountId: string().required(),
        });
      }),
    }).required(),
  })
    .json()
    .typeError('Invalid JSON'),
});
/*
 // params: Yup.object({
      //   accountId: Yup.string()
      //     .required('Account ID is required')
      //     .matches(/^[a-z0-9._-]+$/, 'Invalid account ID format'),
      //
      //   finality: Yup.string()
      //     .required('Finality is required')
      //     .oneOf(['final', 'optimistic'], 'Finality must be "final" or "optimistic"'),
      // }).required('Params are required'),
 */
