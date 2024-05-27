import { CreateName } from './CreateName/CreateName.jsx';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './CreateName/schema.js';

export const Modal = ({ styles, isOpen, setOpen }) => {
  const form = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: { callName: '' },
  });

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <form>
      <CreateName closeModal={closeModal} isOpen={isOpen} styles={styles} form={form} />
    </form>
  );
};
