import { useStoreEffect } from '../../../../../../../../react-vault';
import { ModalGroup } from '../../../ModalGroup/ModalGroup.tsx';
import { Item } from '../Item/Item.tsx';
import { useNavigate } from 'react-router-dom';
import { useWatch } from 'react-hook-form';

const method = {
  type: 'block',
  text: 'View access key',
  method: 'block',
  params: {
    type: 'finality',
    finality: 'final',
    block_id: '',
  },
};

export const Block = ({ closeModal, isOpen, setStep, styles, form }: any) => {
  const createCall = useStoreEffect((store: any) => store.calls.createCall);
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
