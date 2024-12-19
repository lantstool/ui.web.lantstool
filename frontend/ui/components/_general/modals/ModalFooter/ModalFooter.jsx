import { Button } from '../../Button/Button.jsx';
import cnm from 'classnames';
import cn from './ModalFooter.module.scss';

export const ModalFooter = ({ action: { label, onClick, disabled }, close, classes }) => (
  <div className={cnm(cn.modalFooter, classes?.container && classes.container)}>
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
