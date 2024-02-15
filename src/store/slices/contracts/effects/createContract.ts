import { effect } from '../../../../react-vault';
import { v1 } from 'uuid';

const generateCall = (name: string, spaceId: string) => {
  const contractId = v1();
  return {
    spaceId,
    contractId,
    name,
    createdAt: Date.now(),
  };
};

export const createContract = effect(async ({ payload, slice, store }: any) => {
  const { formValues, close, navigate } = payload;
  const [idb] = store.getEntities((store: any) => store.idb);
  const { spaceId } = store.getState((store: any) => store.networks.current);
  const addContract = slice.getActions((slice: any) => slice.addContract);

  try {
    const contract = generateCall(formValues.name, spaceId);
    await idb.add('contracts', contract);

    addContract(contract);
    navigate(contract.contractId);
    close();
  } catch (e) {
    console.log(e);
  }
});
