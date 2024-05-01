import { useStoreEffect } from '../../../../../../../../react-vault';
import { useNavigate } from 'react-router-dom';
import { ModalGroup } from '../../../ModalGroup/ModalGroup.tsx';
import { methods } from './methods.ts';
import { Item } from '../Item/Item.tsx';
import { useWatch } from 'react-hook-form';

export const Protocol = ({ closeModal, isOpen, setStep, styles, form }: any) => {
  const createCall = useStoreEffect((store: any) => store.calls.createCall);
  const navigate = useNavigate();
  const name = useWatch({ control: form.control, name: 'callName' });
  const prev = () => setStep('selectRpcGroup');

  const createdCall = (method: any) => {
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
      {methods.map((method: any) => (
        <Item key={method.type} el={method} onClick={() => createdCall(method)} />
      ))}
    </ModalGroup>
  );
};
