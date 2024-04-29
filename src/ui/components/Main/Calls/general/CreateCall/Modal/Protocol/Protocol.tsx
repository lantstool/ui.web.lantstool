import { useStoreEffect } from '../../../../../../../../react-vault';
import { useNavigate } from 'react-router-dom';
import { ModalGroup } from '../../../ModalGroup/ModalGroup.tsx';
import { methods } from './methods.ts';
import { Item } from '../Item/Item.tsx';

export const Protocol = ({ closeModal, isOpen, setStep, styles }: any) => {
  const createCall = useStoreEffect((store: any) => store.calls.createCall);
  const navigate = useNavigate();
  const prev = () => setStep('selectRpcGroup');

  const createdCall = (method: any) => {
    createCall({ method, navigate, close: closeModal });
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
