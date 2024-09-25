import { Create } from './Create/Create.jsx';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './Create/schema.js';

// TODO: Why do we need form here? REFACTOR!
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
      <Create closeModal={closeModal} isOpen={isOpen} styles={styles} form={form} />
    </form>
  );
};
