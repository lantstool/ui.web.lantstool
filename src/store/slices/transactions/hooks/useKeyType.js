import { useEffect } from 'react';
import { appendAction } from '../../../../ui/components/Main/Transactions/Transaction/Form/Actions/AddAction/appendAction.js';
import { useWatch } from 'react-hook-form';


export const useKeyType = (append, form) => {
  const signerKey = useWatch({ control: form.control, name: 'signerKey.permission' });
  const formValues = form.getValues()
  const isFunctionCallExist = formValues.actions.find((el)=>el.type ==='FunctionCall')

  const keyType =
    signerKey?.functionCall !== undefined
      ? 'FunctionCall'
      : signerKey === 'FullAccess'
      ? 'FullAccess'
      : 'Empty';

  useEffect(() => {
    if (keyType === 'FunctionCall'&& !isFunctionCallExist) {
      return appendAction.functionCall(append);
    }
  }, [keyType]);

  return keyType;
};
