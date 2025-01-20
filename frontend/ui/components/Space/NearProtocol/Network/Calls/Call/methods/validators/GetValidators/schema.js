import { object, string } from 'yup';
import { schemes } from '../../../../../_general/validations/schemes.js';

export const schema = object({
  epochId: string().when('epochTarget', {
    is: 'specific',
    then: () => schemes.hash('Epoch ID'),
    otherwise: () => string().notRequired(),
  }),
});
