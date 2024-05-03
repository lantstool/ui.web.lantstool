import { useStoreEffect } from '../../../../../../../../react-vault';
import { useNavigate } from 'react-router-dom';
import { ModalGroup } from '../../../ModalGroup/ModalGroup.jsx';
import { methods } from './methods.ts';
import { Item } from '../Item/Item.jsx';
import { useWatch } from 'react-hook-form';

export const Protocol = ({ closeModal, isOpen, setStep, styles, form }) => {
  const createCall = useStoreEffect((store) => store.calls.createCall);
  const navigate = useNavigate();
  const name = useWatch({ control: form.control, name: 'callName' });
  const prev = () => setStep('selectRpcGroup');

  const createdCall = (method) => {
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
      {methods.map((method) => (
        <Item key={method.type} el={method} onClick={() => createdCall(method)} />
      ))}
    </ModalGroup>
  );
};
