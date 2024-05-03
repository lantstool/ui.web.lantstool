import { useStoreEffect } from '../../../../../../../../react-vault';
import { ModalGroup } from '../../../ModalGroup/ModalGroup.jsx';
import { Item } from '../Item/Item.jsx';
import { useNavigate } from 'react-router-dom';
import { useWatch } from 'react-hook-form';

const method = {
  type: 'gas_price',
  text: 'Gas Price',
  method: 'gas_price',
  params: {
    type: 'block',
    block: '',
    lastBlock: null,
  },
};

export const Gas = ({ closeModal, isOpen, setStep, styles, form }) => {
  const createCall = useStoreEffect((store) => store.calls.createCall);
  const navigate = useNavigate();
  const name = useWatch({ control: form.control, name: 'callName' });
  const prev = () => setStep('selectRpcGroup');

  const createdCall = () => {
    createCall({ name, method, navigate, close: closeModal });
  };

  return (
    <ModalGroup
      isOpen={isOpen}
      closeModal={closeModal}
      styles={styles}
      prev={prev}
      text="Create Call"
    >
      <Item key={method.type} el={method} onClick={createdCall} />
    </ModalGroup>
  );
};
