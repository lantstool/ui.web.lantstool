import { Modal } from '../../../../components/_general/Modal/Modal.jsx';
import { Title } from '../../../../components/Space/NearProtocol/Network/_general/Title/Title.jsx';
import { CloseButton } from '../../../../components/Space/NearProtocol/Network/_general/CloseButton/CloseButton.jsx';
import cn from './AddNetwork.module.css';
import { InputGroup } from '../../../../components/_general/InputGroup/InputGroup.jsx';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useStoreEffect } from '../../../../../../react-vault/index.js';

export const AddNetwork = () => {
  const createNetwork = useStoreEffect((store) => store.networks.createNetwork);
  const [isOpen, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    mode: 'all',
    defaultValues: { name: '', url: { rpc: '' } },
  });

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = (data) => {
    createNetwork(data);
    setOpen(false);
    reset();
  };

  return (
    <>
      <button className={cn.addBtn} onClick={openModal}>
        Add Network
      </button>
      <Modal isOpen={isOpen} close={closeModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={cn.modalContainer}>
            <div className={cn.header}>
              <Title text="Add Network" />
              <CloseButton close={closeModal} />
            </div>
            <div>
              <InputGroup register={register} name="name" label="Network name" />
              <fieldset style={{ borderRadius: 8 }}>
                <legend>Urls</legend>
                <InputGroup register={register} name={'url.rpc'} label="RPC" />
                <InputGroup register={register} name={'url.myNearWallet'} label="MyNearWallet" />
              </fieldset>
            </div>
            <button className={cn.btnAddTransaction} type="submit">
              Add Network
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
