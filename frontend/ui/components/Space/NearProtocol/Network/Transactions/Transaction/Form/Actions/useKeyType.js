import { useEffect } from 'react';
import { appendAction } from './AddAction/appendAction.js';
import { useWatch } from 'react-hook-form';

function getKeyType(signerKey) {
  if (signerKey?.functionCall !== undefined) {
    return 'FunctionCall';
  } else if (signerKey === 'FullAccess') {
    return 'FullAccess';
  } else {
    return 'Empty';
  }
}

export const useKeyType = (append, form) => {
  // TODO: rework it! permission should be fetched every time for saved key - it's possible
  // that user could save FA key but then would change to FC key
  const signerKey = useWatch({ control: form.control, name: 'signerKey.permission' });
  const formValues = form.getValues();
  const isFunctionCallExist = formValues.actions.find((el) => el.type === 'FunctionCall');
  const keyType = getKeyType(signerKey);

  useEffect(() => {
    if (keyType === 'FunctionCall' && !isFunctionCallExist) {
      return appendAction.functionCall(append);
    }
  }, [keyType]);

  return keyType;
};
