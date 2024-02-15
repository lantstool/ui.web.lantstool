import cn from './CloseButton.module.css';
import CloseIcon from '@mui/icons-material/Close';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import closeIcon from '../../../../../assets/closeIcon.svg';

export const CloseButton = ({ close }: any) => {
  return (
    <div className={cn.btnClose} onClick={close}>
      <CancelOutlinedIcon className={cn.icon} />
    </div>
  );
};
