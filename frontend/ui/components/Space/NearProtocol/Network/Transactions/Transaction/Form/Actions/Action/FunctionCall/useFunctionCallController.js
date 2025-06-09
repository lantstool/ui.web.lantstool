import { useState, useEffect } from 'react';

const restrictedTypes = ['AddKey', 'DeployContract', 'DeleteKey', 'DeleteAccount'];

const getActionsState = (actions) => {
  const isRestricted = actions.some((action) => restrictedTypes.includes(action.type));
  const hasCreateAccount = actions.some((action) => action.type === 'CreateAccount');
  const isOnlyFunctionCallOrTransfer = actions.every(
    (action) => action.type === 'FunctionCall' || action.type === 'Transfer',
  );

  return { isRestricted, hasCreateAccount, isOnlyFunctionCallOrTransfer };
};

const getExistedFunctionCall = (actions) => {
  return actions.find((action) => action.type === 'FunctionCall');
};

const getExistedContractId = (actions) => {
  return actions.find((action) => action.type === 'FunctionCall' && action.contractId)?.contractId;
};

export const useFunctionCallController = (form, getName) => {
  const { watch, setValue} = form;
  const actions = watch('actions');
  const receiverId = watch('receiverId');
  const selectedContractId = watch(getName('contractId'));
  const [actionsLength, setActionsLength] = useState(null);
  const { isRestricted, hasCreateAccount, isOnlyFunctionCallOrTransfer } = getActionsState(actions);
  const existedContractId = getExistedContractId(actions);
  const existedFunctionCall = getExistedFunctionCall(actions);


  useEffect(() => {
    if (isRestricted || hasCreateAccount) return;
    const newValue = selectedContractId?.value ?? null;

    actions.forEach((action, index) => {
      if (action.type !== 'FunctionCall') return;
      const currentValue = action.contractId?.value ?? null;
      //Sync all function call changes
      if (currentValue !== newValue && selectedContractId) {
        setValue(
          `actions.${index}.contractId`,
          newValue ? { label: newValue, value: newValue } : currentValue,
        );
      }
      //Add new contractId with existed contract id
      if (currentValue !== newValue && !selectedContractId && actions.length > actionsLength) {
        setValue(`actions.${index}.contractId`, existedContractId);
      }
      //Remove all contractId
      if (currentValue !== newValue && !newValue && actions.length === actionsLength) {
        setValue(`actions.${index}.contractId`, selectedContractId);
      }
      //If receiverId exist add first time value to new contract id
      if (
        receiverId &&
        !existedContractId &&
        existedFunctionCall &&
        actions.length > actionsLength
      ) {
        setValue(`actions.${index}.contractId`, receiverId);
      }
    });
    //Sync receiverId with contractId when contractId change
    if ((!receiverId && existedContractId) || existedContractId?.value !== receiverId?.value) {
      setValue('receiverId', selectedContractId);
    }

    setActionsLength(actions.length);
  }, [actions, hasCreateAccount, selectedContractId]);

  // Sync contractId when we have createAccount or restrictedTypes
  useEffect(() => {
    if (isOnlyFunctionCallOrTransfer) return;
    actions.forEach((action, index) => {
      if (action.type === 'FunctionCall' && action.contractId !== receiverId) {
        setValue(`actions.${index}.contractId`, receiverId);
      }
    });
  }, [receiverId]);
  return {
    isRestricted,
    hasCreateAccount,
  };
};
