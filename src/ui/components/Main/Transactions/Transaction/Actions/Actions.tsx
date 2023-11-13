import { useFieldArray } from 'react-hook-form';
import { Action } from './Action/Action.tsx';
import { AddAction } from './AddAction/AddAction.tsx';
import cn from './Actions.module.css';
import { useState } from 'react';

export const Actions = ({ form }: any) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'actions',
  });

  return (
    <div>
      <h3>Actions</h3>
      {fields.map((action: any, index) => (
        <Action key={action.actionId} index={index} action={action} form={form} remove={remove} />
      ))}
      <AddAction append={append} />
    </div>
  );
};
