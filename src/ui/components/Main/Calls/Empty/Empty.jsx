import cn from './Empty.module.css';
import { CreateCall } from '../general/CreateCall/CreateCall.jsx';

export const Empty = () => {
  return (
    <div className={cn.empty}>
      <CreateCall styles={cn.modalContainer} />
    </div>
  );
};
