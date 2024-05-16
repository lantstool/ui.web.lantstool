import { ModalGroup } from '../../../ModalGroup/ModalGroup.jsx';
import { Button } from '../../../../../general/Button/Button.jsx';
import { useWatch } from 'react-hook-form';
import { useStoreEffect } from '../../../../../../../../react-vault/store/effects/useStoreEffect.js';
import { useNavigate } from 'react-router-dom';
import { MethodSelector } from './MethodSelector/MethodSelector.jsx';

export const SelectRpcGroup = ({ styles, isOpen, setStep, closeModal, form }) => {
  const prev = () => setStep('createName');

  const name = useWatch({ control: form.control, name: 'callName' });
  const method = useWatch({ control: form.control, name: 'method' });
  const createCall = useStoreEffect((store) => store.calls.createCall);
  const navigate = useNavigate();
  const createdCall = () => {
    createCall({ name, method, navigate, close: closeModal });
  };

  return (
    <ModalGroup
      prev={prev}
      isOpen={isOpen}
      closeModal={closeModal}
      styles={styles}
      text={'Select RPC Type'}
    >
      <MethodSelector form={form} />
      <Button disabled={!method} onClick={createdCall} text="Create" />
    </ModalGroup>
  );
};
