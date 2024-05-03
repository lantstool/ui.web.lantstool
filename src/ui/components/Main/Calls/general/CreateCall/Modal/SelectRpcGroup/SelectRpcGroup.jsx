import { ModalGroup } from '../../../ModalGroup/ModalGroup.jsx';
import { Item } from '../Item/Item.jsx';

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

export const SelectRpcGroup = ({ styles, isOpen, setStep, closeModal }) => {
  const prev = () => setStep('createName');
  const toStep = (type) => setStep(type);

  return (
    <ModalGroup
      prev={prev}
      isOpen={isOpen}
      closeModal={closeModal}
      styles={styles}
      text={'Select RPC Type'}
    >
      {steps.map((step) => (
        <Item
          key={step.type}
          el={step}
          onClick={() => toStep(step.type)}
          disabled={step.disabled}
        />
      ))}
    </ModalGroup>
  );
};
