import { yupResolver } from '@hookform/resolvers/yup';
import { useStoreAction } from '@react-vault';
import { useEffect, Children, cloneElement, isValidElement } from 'react';
import { useForm } from 'react-hook-form';
import { SelectMethod } from './SelectMethod/SelectMethod.jsx';
import { Topbar } from './Topbar/Topbar.jsx';
import { ActionBar } from './ActionBar/ActionBar.jsx';
import cn from './Form.module.scss';

/*
 We want to pass some props from the form into child components to be able to use
 components, which depend on the 'form', 'control' etc. This func is recursive and add props
 on any depth and only to components - it doesn't touch plain html elements
 */
const addPropsToChildren = (children = [], props = {}) =>
  Children.map(children, (child) =>
    isValidElement(child)
      ? cloneElement(child, {
          ...(typeof child.type === 'string' ? {} : props), // Add props only to components and skip plain html
          children: child.props.children
            ? addPropsToChildren(child.props.children, props)
            : child.props.children,
        })
      : child,
  );

export const Form = ({ call, draft, children, methodDescription, schema }) => {
  const { callId } = call;
  const setDraft = useStoreAction((store) => store.nearProtocol.calls.setDraft);

  // We don't need to validate some methods - we won't pass a schema for them
  const form = useForm({
    mode: 'onTouched',
    resolver: schema ? yupResolver(schema) : undefined,
  });

  useEffect(() => {
    form.reset(draft);
    return () => setDraft({ callId, draft: form.getValues() });
  }, [callId]);

  const childrenWithProps = addPropsToChildren(children, {
    form,
    callId,
    control: form.control,
  });

  return (
    <div className={cn.form}>
      <Topbar call={call} />
      <SelectMethod callId={callId} method={draft.method} />
      {methodDescription}
      <div className={cn.fieldsContainer}>{childrenWithProps}</div>
      <ActionBar form={form} call={call} />
    </div>
  );
};
