import { ModalGroup } from '../../../ModalGroup/ModalGroup.tsx';
import { Item } from '../Item/Item.tsx';

const steps = [
  { type: 'accessKeys', text: 'Access Keys' },
  { type: 'accounts', text: 'Accounts' },
  { type: 'contracts', text: 'Contracts' },
  { type: 'block', text: 'Block' },
  { type: 'chunk', text: 'Chunk' },
  { type: 'gas', text: 'Gas' },
  { type: 'protocol', text: 'Protocol' },
  { type: 'network', text: 'Network' },
  { type: 'transactions', text: 'Transactions' },
];

export const SelectRpcGroup = ({ styles, isOpen, setStep, closeModal }: any) => {
  const toStep = (type: string) => setStep(type);

  return (
    <ModalGroup isOpen={isOpen} closeModal={closeModal} styles={styles} text={'Select RPC Type'}>
      {steps.map((step: any) => (
        <Item key={step.type} el={step} onClick={() => toStep(step.type)} />
      ))}
    </ModalGroup>
  );
};
