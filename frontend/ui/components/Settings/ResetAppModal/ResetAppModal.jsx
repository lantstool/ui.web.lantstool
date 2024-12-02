import { Modal } from '../../_general/modals/Modal/Modal.jsx';
import { Input } from '../../_general/Input/Input.jsx';
import { Button } from '../../_general/Button/Button.jsx';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';
import { schema } from './schema.js';
import cn from './ResetAppModal.module.scss';

export const ResetAppModal = ({ isResetApp, setResetApp }) => {
  const navigate = useNavigate();
  const resetApp = useStoreEffect((store) => store.resetApp);

  const form = useForm({
    defaultValues: { reset: '' },
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const closeModal = () => {
    setResetApp(false);
  };

  const onSubmit = () => {
    resetApp({ navigate });
  };

  return (
    <Modal isOpen={isResetApp} closeModal={closeModal}>
      <form className={cn.resetAppModal} onSubmit={handleSubmit(onSubmit)}>
        <div className={cn.textWrapper}>
          <h2 className={cn.title}>Reset the app?</h2>
          <p className={cn.subtitle}>
            If you encounter technical issues or want to erase all content, you can reset it, but
            all data will be lost forever.
          </p>
        </div>
        <Input
          name="reset"
          error={errors?.reset?.message}
          control={control}
          label="Type RESET to confirm"
          copy={false}
        />
        <div className={cn.buttonWrapper}>
          <Button color="secondary" size="medium" onClick={closeModal}>
            Cancel
          </Button>
          <Button disabled={!isValid} color="danger" size="medium" type="submit">
            Reset
          </Button>
        </div>
      </form>
    </Modal>
  );
};
