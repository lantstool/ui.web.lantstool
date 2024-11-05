import { useStoreAction, useStoreState } from '@react-vault';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Topbar } from './Topbar/Topbar.jsx';
import { SelectMethod } from './SelectMethod/SelectMethod.jsx';
import { getFields } from './getFields.js';
import cn from './Form.module.scss';

export const Form = ({ call }) => {
  const { callId, body } = call;
  const [method, setMethod] = useState(body.method);
  // const draft = useStoreState((store) => store.nearProtocol.calls.drafts[callId]);
  // const setDraft = useStoreAction((store) => store.nearProtocol.calls.setDraft);

  console.log(method);
  // const method = useWatch({ control: form.control, name: 'method' });
  const Fields = getFields(method);
  // console.log(Fields);
  // useLayoutEffect(() => {
  //   form.reset(body);
  //   if (draft) form.reset(draft, { keepDefaultValues: true });
  //   return () => setDraft({ callId, draft: form.getValues() });
  // }, [callId]);

  return (
    <div className={cn.container}>
      {Fields && <Fields call={call} method={method} setMethod={setMethod} />}
    </div>
  );
};
/*
<div className={cn.container}>
      <Topbar call={call} form={form} />
      <div className={cn.body}>
        <SelectMethod form={form} />
        {Fields && <Fields call={call} form={form} />}
      </div>
    </div>
 */
