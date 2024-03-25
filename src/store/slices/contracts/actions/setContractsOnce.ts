import { action } from '../../../../react-vault';

export const setContractsOnce = action(({ slice, payload: contracts }: any) => {
  const ids = [];
  const records = {};
  contracts.forEach((contract: any) => {
    ids.push(contract.contractId);
    records[contract.contractId] = contract;
  });

  slice.ids = ids;
  slice.records = records;
  slice.isContractsLoadedToState = true;
});
