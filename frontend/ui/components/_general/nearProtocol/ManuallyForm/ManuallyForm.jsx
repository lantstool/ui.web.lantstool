import { Button } from '../../Button/Button.jsx';
import { RpcForm } from '../RpcForm/RpcForm.jsx';
import cn from './Manually.module.scss';

export const ManuallyForm = ({ onSubmit, form, goBack, btnText }) => (
  <>
    <RpcForm form={form} classes={{ container: cn.rpcFormContainer }} />
    <div className={cn.buttonWrapper}>
      {goBack && (
        <Button color="secondary" onClick={goBack} iconLeftStyles={cn.backIcon}>
          Back
        </Button>
      )}
      <Button onClick={onSubmit}>{btnText}</Button>
    </div>
  </>
);
