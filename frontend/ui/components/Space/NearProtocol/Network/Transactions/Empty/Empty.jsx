import cn from './Empty.module.css';
import { CreateTransaction } from '../_general/CreateTransaction/CreateTransaction.jsx';

export const Empty = () => {
  return (
    <div className={cn.empty}>
      <CreateTransaction styles={cn.modalContainer} />
    </div>
  );
};
