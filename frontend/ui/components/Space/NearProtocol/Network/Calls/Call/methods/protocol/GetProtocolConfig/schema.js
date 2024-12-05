import { object, string } from 'yup';

export const schema = object({
  blockId: string().test('mandatory', 'Block Id is a mandatory field', (value, context) => {
    if (context.parent.blockTarget === 'latest') return true;
    return Boolean(value);
  }),
});
