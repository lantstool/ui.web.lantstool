import { action } from '../../../../react-vault';

export const addContract = action(({ slice, payload: contract }: any) => {
  slice.ids.push(contract.contractId);
  slice.records[contract.contractId] = contract;
});
