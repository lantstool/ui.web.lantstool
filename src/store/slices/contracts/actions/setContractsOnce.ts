import { action } from '../../../../react-vault';

export const setContractsOnce = action(({ slice, payload: contracts }: any) => {
  contracts.forEach((contract: any) => {
    slice.ids.push(contract.contractId);
    slice.records[contract.contractId] = contract;
  });
  slice.isContractsLoadedToState = true;
});
