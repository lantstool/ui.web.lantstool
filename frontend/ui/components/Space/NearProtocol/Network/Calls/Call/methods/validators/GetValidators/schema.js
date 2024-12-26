import { object, string } from 'yup';

export const schema = object({
  epochId: string()
    .test('mandatory', 'Epoch Id is a mandatory field', (value, context) => {
      if (context.parent.epochTarget === 'latest') return true;
      return Boolean(value);
    })
    .nullable(),
});
