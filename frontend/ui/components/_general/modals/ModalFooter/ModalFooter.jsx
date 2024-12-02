import { Button } from '../../Button/Button.jsx';
import cn from './ModalFooter.module.scss';

export const ModalFooter = ({ action: { label, onClick, disabled }, close }) => (
  <div className={cn.modalFooter}>
    {close && (
      <Button color="secondary" size="medium" onClick={close}>
        Cancel
      </Button>
    )}
    <Button disabled={disabled} size="medium" onClick={onClick}>
      {label}
    </Button>
  </div>
);
