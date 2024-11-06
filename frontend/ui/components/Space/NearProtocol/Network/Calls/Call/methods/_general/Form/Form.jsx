import { useStoreAction } from '@react-vault';
import { useEffect, Children, cloneElement } from 'react';
import { useForm } from 'react-hook-form';
import { SelectMethod } from './SelectMethod/SelectMethod.jsx';
import { Topbar } from './Topbar/Topbar.jsx';
import cn from './Form.module.scss';

export const Form = ({ call, draft, children }) => {
  const { callId } = call;
  const setDraft = useStoreAction((store) => store.nearProtocol.calls.setDraft);
  const form = useForm();

  useEffect(() => {
    form.reset(draft);
    return () => {
      setDraft({ callId, draft: form.getValues() });
    };
  }, [callId]);

  const childrenWithProps = Children.map(children, (child) =>
    cloneElement(child, { form, callId }),
  );

  return (
    <form className={cn.form}>
      <Topbar call={call} form={form} />
      <div className={cn.fieldsContainer}>
        <SelectMethod callId={callId} method={draft.method} />
        {childrenWithProps}
      </div>
    </form>
  );
};
