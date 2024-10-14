import { useWatch } from 'react-hook-form';
import cn from './CreateAccount.module.css';

export const CreateAccount = ({ form }) => {
  const accountId = useWatch({
    control: form.control,
    name: 'receiverId',
  });

  return <p className={cn.title}>{accountId}</p>;
};
