import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup.string().min(1, 'Length 1 symbols').max(120, 'Length 120 symbols'),
});
