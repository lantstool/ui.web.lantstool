import cn from './CloseButton.module.css';
import { CloseIcon } from '../../../../assets/components/CloseIcon.tsx';

export const CloseButton = ({ close }: any) => {
  return (
    <div className={cn.btnClose} onClick={close}>
      <CloseIcon style={cn.icon} />
    </div>
  );
};
