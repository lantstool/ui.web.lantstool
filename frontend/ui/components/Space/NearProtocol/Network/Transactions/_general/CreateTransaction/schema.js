import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup.string().min(1, 'Length 1 symbols').max(100, 'Length 100 symbols'),
});
