import * as yup from 'yup';

export const schema = yup.object().shape({
  label: yup.string().min(1, 'Length 1 symbols').max(60, 'Length 100 symbols'),
});
