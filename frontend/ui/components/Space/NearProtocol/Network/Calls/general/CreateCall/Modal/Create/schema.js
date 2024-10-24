import * as yup from 'yup';

export const schema = yup.object().shape({
  callName: yup.string().min(1, 'Length 1 symbols').max(140, 'Length 140 symbols'),
});
