import cn from './CloseButton.module.css';
import { CloseIcon } from '../../../../../_general/icons/CloseIcon.jsx';

export const CloseButton = ({ close }) => {
  return (
    <div className={cn.btnClose} onClick={close}>
      <CloseIcon style={cn.icon} />
    </div>
  );
};
