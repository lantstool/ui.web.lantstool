import { useWatch } from 'react-hook-form';
import cn from './CreateAccount.module.scss';

export const CreateAccount = ({ form }) => {
  const accountId = useWatch({
    control: form.control,
    name: 'receiverId.value',
  });

  return <p className={cn.title}>{accountId}</p>;
};
