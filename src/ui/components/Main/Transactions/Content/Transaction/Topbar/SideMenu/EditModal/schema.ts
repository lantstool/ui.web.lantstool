import * as yup from 'yup';
export const schema = yup.object().shape({
  transactionName: yup.string().min(1, 'length 1 symbols').max(72, 'Max length 72 symbols'),
});
