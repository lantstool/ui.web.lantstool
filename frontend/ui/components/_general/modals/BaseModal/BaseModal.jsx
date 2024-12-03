import { createPortal } from 'react-dom';
import cn from './BaseModal.module.scss';
import cnm from 'classnames';

// We use onMouseDown instead of onClick to prevent the modal from closing
// when the user tries to select input text but releases the mouse outside the modal.

export const BaseModal = ({ children, close, classes }) =>
  createPortal(
    <div className={cn.backstage} onMouseDown={close}>
      <div
        className={cnm(cn.modal, classes?.modal && classes.modal)}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.getElementById('modal'),
  );
