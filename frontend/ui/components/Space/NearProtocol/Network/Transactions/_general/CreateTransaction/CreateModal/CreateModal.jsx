import { useEffect } from 'react';
import { useStoreEffect } from '../../../../../../../../../../react-vault/index.js';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../schema.js';
import { Button } from '../../../../_general/Button/Button.jsx';
import { Modal } from '../../../../../../../_general/Modal/Modal.jsx';
import { Title } from '../../../../_general/Title/Title.jsx';
import { CloseButton } from '../../../../_general/CloseButton/CloseButton.jsx';
import { Subtitle } from '../../../../_general/Subtitle/Subtitle.jsx';
import { InputGroup } from '../../../../../../../_general/InputGroup/InputGroup.jsx';
import { ErrorMessage } from '../../../../_general/ErrorMessage/ErrorMessage.jsx';
import cn from './CreateModal.module.scss';

export const CreateModal = ({ styles, isOpen, setOpen }) => {
  const create = useStoreEffect((store) => store.nearProtocol.transactions.create);
  const getCount = useStoreEffect((store) => store.nearProtocol.transactions.getCount);
  const navigate = useNavigate();
  const { spaceId, networkId } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: { name: 'Transaction' },
  });

  useEffect(() => {
    (async () => {
      const count = await getCount({ spaceId, networkId });
      setValue('name', `Transaction#${count + 1}`);
    })();
  }, [isOpen]);

  const closeModal = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = (formValues) => {
    create({ spaceId, networkId, formValues, closeModal, navigate });
  };

  return (
    <Modal isOpen={isOpen} close={closeModal}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles}>
          <div className={cn.header}>
            <Title text="Create transaction" />
            <div className={cn.closeBtn}>
              <CloseButton close={closeModal} />
            </div>
          </div>
          <div className={cn.subtitle}>
            <Subtitle text="Type the name of the transaction you want to create" />
          </div>
          <div>
            <InputGroup register={register} name="name" label="Transaction Name" />
            <ErrorMessage error={errors.name?.message} />
          </div>
          <Button text="Create" style="secondary" type="submit" />
        </div>
      </form>
    </Modal>
  );
};
