import { BaseModal } from '../BaseModal/BaseModal.jsx';
import { Button } from '../../Button/Button.jsx';
import cn from './DeleteModal.module.scss';

export const DeleteModal = ({ close, submit, text: { title, description, submitButtonText } }) => (
  <BaseModal close={close}>
    <div className={cn.textWrapper}>
      <h1 className={cn.title}>{title}</h1>
      <p className={cn.description}>{description}</p>
    </div>
    <div className={cn.buttonWrapper}>
      <Button color="secondary" size="medium" onClick={close}>
        Cancel
      </Button>
      <Button color="danger" size="medium" onClick={submit}>
        {submitButtonText}
      </Button>
    </div>
  </BaseModal>
);
