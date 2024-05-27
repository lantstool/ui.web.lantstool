import cn from './Empty.module.css';
import { AddTransaction } from '../general/AddTransaction/AddTransaction.jsx';

export const Empty = () => {
  return (
    <div className={cn.empty}>
      <AddTransaction styles={cn.modalContainer} />
    </div>
  );
};
