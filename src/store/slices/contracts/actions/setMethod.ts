import { action } from '../../../../react-vault';

export const setMethod = action(({ slice, payload }: any) => {
  const { contractId, formValues } = payload;
  slice.records[contractId].methods = formValues;
});
