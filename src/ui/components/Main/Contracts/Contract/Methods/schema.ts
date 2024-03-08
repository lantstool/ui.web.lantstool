import { object, string, array } from 'yup';

const isUnique = (value: any, values: any) => {
  const change = values.from[1].value.change.map((item: any) => item.methodName);
  const view = values.from[1].value.view.map((item: any) => item.methodName);
  return [...change, ...view].filter((item: any) => item === value).length === 1;
};

export const schema: any = object().shape({
  view: array(
    object({
      methodName: string()
        .min(1, 'Min 1 symbol')
        .test('unique', 'Method already exists', (value: any, values: any) => {
          return isUnique(value, values);
        }),
    }),
  ),
  change: array(
    object({
      methodName: string()
        .min(1, 'Min 1 symbol')
        .test('unique', 'Method already exists', (value: any, values: any) => {
          return isUnique(value, values);
        }),
    }),
  ),
});
