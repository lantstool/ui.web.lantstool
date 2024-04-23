import { ModalGroup } from '../../../ModalGroup/ModalGroup.tsx';
import { Item } from '../Item/Item.tsx';

const steps = [
  { type: 'accessKeys', text: 'Access Keys' },
  { type: 'accounts', text: 'Accounts', disabled: true },
  { type: 'contracts', text: 'Contracts' },
  { type: 'block', text: 'Block', disabled: true },
  { type: 'chunk', text: 'Chunk', disabled: true },
  { type: 'gas', text: 'Gas', disabled: true },
  { type: 'protocol', text: 'Protocol', disabled: true },
  { type: 'network', text: 'Network', disabled: true },
  { type: 'transactions', text: 'Transactions', disabled: true },
];

export const SelectRpcGroup = ({ styles, isOpen, setStep, closeModal }: any) => {
  const toStep = (type: string) => setStep(type);

  return (
    <ModalGroup isOpen={isOpen} closeModal={closeModal} styles={styles} text={'Select RPC Type'}>
      {steps.map((step: any) => (
        <Item key={step.type} el={step} onClick={() => toStep(step.type)} disabled={step.disabled}/>
      ))}
    </ModalGroup>
  );
};
