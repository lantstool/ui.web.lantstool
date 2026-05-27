import { yupResolver } from '@hookform/resolvers/yup';
import { useStoreAction, useStoreState } from '@react-vault';
import { useLayoutEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { SelectMethod } from './SelectMethod/SelectMethod.jsx';
import { Topbar } from './Topbar/Topbar.jsx';
import { ActionBar } from './ActionBar/ActionBar.jsx';
import { addPropsToChildren } from '../../../../../../../../../../utils.js';
import { usePersistentScroll } from '../../../../../../_general/hooks/usePersistentScroll.js';
import cn from './Form.module.scss';

export const Form = ({ call, draft, children, methodDescription, schema }) => {
  const { callId } = call;
  const setDraft = useStoreAction((store) => store.nearProtocol.calls.setDraft);
  const scrollPosition = useStoreState((store) => store.nearProtocol.calls.scrollPositions[callId]);
  const setScrollPosition = useStoreAction((store) => store.nearProtocol.calls.setScrollPosition);
  const formRef = useRef(null);
  // We don't need to validate some methods - we won't pass a schema for them
  const form = useForm({
    mode: 'onTouched',
    resolver: schema ? yupResolver(schema) : undefined,
  });
  // useLayoutEffect ensures draft is applied before scroll position is restored,
  // preventing layout recalculation after initial paint
  useLayoutEffect(() => {
    form.reset(draft);
    return () => setDraft({ callId, draft: form.getValues() });
  }, [callId]);

  usePersistentScroll({
    ref: formRef,
    scrollPosition,
    onSave: (sp) => setScrollPosition({ callId, scrollPosition: sp }),
  });
  /*
   We want to pass some props from the form into child components to be able to use
   components, which depend on the 'form', 'control' etc. This func is recursive and add props
   on any depth and only to components - it doesn't touch plain html elements
  */
  const childrenWithProps = addPropsToChildren(children, {
    form,
    callId,
    control: form.control,
  });

  return (
    <div ref={formRef} className={cn.form}>
      <div className={cn.formContainer}>
        <Topbar call={call} form={form} />
        <SelectMethod callId={callId} method={draft.method} />
        {methodDescription}
        <div className={cn.fieldsContainer}>{childrenWithProps}</div>
        <ActionBar form={form} call={call} />
      </div>
    </div>
  );
};
