import { useEffect } from 'react';

const restrictedTypes = ['AddKey', 'DeployContract', 'DeleteKey', 'DeleteAccount'];

const getActionsState = (actions) => {
  const isRestricted = actions.some((action) => restrictedTypes.includes(action.type));
  const hasCreateAccount = actions.some((action) => action.type === 'CreateAccount');
  const isOnlyFunctionCallOrTransfer = actions.every(
    (action) => action.type === 'FunctionCall' || action.type === 'Transfer',
  );

  return { isRestricted, hasCreateAccount, isOnlyFunctionCallOrTransfer };
};

export const useFunctionCallController = (form, getName) => {
  const { watch, setValue } = form;
  const actions = watch('actions');
  const receiverId = watch('receiverId');
  const selectedContractId = watch(getName('contractId'));
  const { isRestricted, hasCreateAccount, isOnlyFunctionCallOrTransfer } = getActionsState(actions);

  useEffect(() => {
    if (isRestricted || hasCreateAccount) return;
    const newValue = selectedContractId?.value ?? null;

    actions.forEach((action, index) => {
      const currentValue = action.contractId?.value ?? null;
      if (action.type !== 'FunctionCall') return;

      //If receiverId exist add first time value to new contract id
      if (receiverId && currentValue !== newValue || !currentValue) {
        setValue(`actions.${index}.contractId`, receiverId);
      }
    });
  }, [JSON.stringify(actions), hasCreateAccount]);

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