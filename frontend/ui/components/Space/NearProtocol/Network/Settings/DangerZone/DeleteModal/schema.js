import * as yup from 'yup';

export const createSchema = (networkId) => {
  return yup.object({
    networkId: yup
      .string()
      .test('matches', 'The entered name does not match the network ID', (value) => {
        return value === networkId;
      }),
  });
};
