import { useStoreAction, useStoreState } from '@react-vault';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Topbar } from './Topbar/Topbar.jsx';
import { SelectMethod } from './SelectMethod/SelectMethod.jsx';
import { getFields } from './getFields.js';
import cn from './Form.module.scss';

export const Form = ({ call }) => {
  const { callId, body } = call;
  const draft = useStoreState((store) => store.nearProtocol.calls.drafts[callId]);
  const setDraft = useStoreAction((store) => store.nearProtocol.calls.setDraft);

  const form = useForm({ defaultValues: body });
  const method = useWatch({ control: form.control, name: 'method' });
  const Fields = getFields(method);

  useEffect(() => {
    form.reset(body);
    if (draft) form.reset(draft, { keepDefaultValues: true });
    return () => setDraft({ callId, draft: form.getValues() });
  }, [callId]);

  return (
    <div className={cn.container}>
      <Topbar call={call} form={form} />
      <SelectMethod form={form} />
      {Fields && <Fields call={call} form={form} />}
    </div>
  );
};
