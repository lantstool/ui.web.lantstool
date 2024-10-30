import { Modal } from '../../../../../../../_general/Modal/Modal.jsx';
import { Input } from '../../../../../../../_general/Input/Input.jsx';
import { formatPublicKey } from '../../../../../../../../../store/helpers/formatPublicKey.js';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../../../../../../_general/Button/Button.jsx';
import { useStoreEffect } from '@react-vault';
import { useNavigate, useParams } from 'react-router-dom';
import { createSchema } from './schema.js';
import cn from './DeleteModal.module.scss';

export const DeleteModal = ({ isOpen, setOpen }) => {
  const { spaceId, networkId, publicKey } = useParams();
  const removeKey = useStoreEffect((store) => store.nearProtocol.keys.removeKey);
  const navigate = useNavigate();
  const schema = createSchema(publicKey);

  const form = useForm({
    defaultValues: { publicKey: '' },
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

  const onSubmit = () => {
    removeKey({ spaceId, networkId, publicKey, navigate, closeModal });
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <form className={cn.deleteModal} onSubmit={handleSubmit(onSubmit)}>
        <div className={cn.textWrapper}>
          <h2 className={cn.title}>Remove {formatPublicKey(publicKey)}</h2>
          <p className={cn.subtitle}>
            Be sure to save this key elsewhere before removing it to avoid losing access to the
            associated account(-s).
          </p>
        </div>
        <Input
          name="publicKey"
          error={errors?.publicKey?.message}
          control={control}
          label="Paste this key to confirm"
          copy={false}
        />
        <div className={cn.buttonWrapper}>
          <Button color="secondary" size="medium" onClick={closeModal}>
            Cancel
          </Button>
          <Button disabled={!isValid} color="danger" size="medium" type="submit">
            Remove
          </Button>
        </div>
      </form>
    </Modal>
  );
};
