import { Modal } from '../../../../../../_general/modals/Modal/Modal.jsx';
import { Input } from '../../../../../../_general/Input/Input.jsx';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../../../../../_general/Button/Button.jsx';
import { useStoreEffect } from '@react-vault';
import { useNavigate } from 'react-router-dom';
import { createSchema } from './schema.js';
import cn from './DeleteModal.module.scss';

export const DeleteModal = ({ isOpen, setOpen, network }) => {
  const { networkId, spaceId } = network;
  const removeOne = useStoreEffect((store) => store.nearProtocol.networks.removeOne);
  const navigate = useNavigate();
  const schema = createSchema(networkId);

  const form = useForm({
    defaultValues: { networkId: '' },
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = form;

  const closeModal = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = handleSubmit(() => {
    removeOne({ spaceId, networkId, navigate });
  });

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <form className={cn.deleteModal} onSubmit={onSubmit}>
        <div className={cn.textWrapper}>
          <h2 className={cn.title}>Delete {networkId}?</h2>
          <p className={cn.subtitle}>
            Deleting this network is permanent and cannot be undone. This will remove all data
            within the network including accounts, <b>keys</b>, transactions, etc.
          </p>
        </div>
        <Input
          name="networkId"
          error={errors?.name?.message}
          control={control}
          label="Enter the network ID to confirm"
          copy={false}
        />
        <div className={cn.buttonWrapper}>
          <Button color="secondary" size="medium" onClick={closeModal}>
            Cancel
          </Button>
          <Button disabled={!isValid} color="danger" size="medium" type="submit">
            Delete
          </Button>
        </div>
      </form>
    </Modal>
  );
};
