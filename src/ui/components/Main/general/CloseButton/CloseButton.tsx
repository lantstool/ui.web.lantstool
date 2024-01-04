import cn from './CloseButton.module.css';
import CloseIcon from '@mui/icons-material/Close';

export const CloseButton = ({ close }: any) => {
  return (
    <button className={cn.btnClose} onClick={close}>
      <CloseIcon />
    </button>
  );
};
