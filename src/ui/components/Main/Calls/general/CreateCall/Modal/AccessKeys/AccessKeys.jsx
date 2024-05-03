import { useStoreEffect } from '../../../../../../../../react-vault';
import { ModalGroup } from '../../../ModalGroup/ModalGroup.jsx';
import { Item } from '../Item/Item.jsx';
import { useNavigate } from 'react-router-dom';
import { methods } from './methods.js';
import { useWatch } from 'react-hook-form';

export const AccessKeys = ({ closeModal, isOpen, setStep, styles, form }) => {
  const createCall = useStoreEffect((store) => store.calls.createCall);
  const navigate = useNavigate();
  const prev = () => setStep('selectRpcGroup');
  const name = useWatch({ control: form.control, name: 'callName' });
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
