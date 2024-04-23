import { useStoreEffect } from '../../../../../../../../react-vault';
import { ModalGroup } from '../../../ModalGroup/ModalGroup.tsx';
import { Item } from '../Item/Item.tsx';
import { useNavigate } from 'react-router-dom';
import { methods } from './methods.ts';

export const Contracts = ({ closeModal, isOpen, setStep, styles }: any) => {
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
