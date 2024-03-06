import { action } from '../../../../react-vault';

export const removeContract = action(({ slice, payload: contractId }: any) => {
  slice.ids = slice.ids.filter((id: string) => id !== contractId);
  delete slice.records[contractId];
});
