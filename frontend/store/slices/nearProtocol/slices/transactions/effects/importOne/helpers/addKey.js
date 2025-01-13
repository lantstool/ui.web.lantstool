import { utils } from '../../../../../helpers/utils.js';

const getAllowance = (allowance, transactionConfig) =>
  allowance === 'unlimited'
    ? {
        isUnlimited: true,
        amount: '0.25',
        unit: transactionConfig.nearUnits.NEAR,
      }
    : {
        isUnlimited: false,
        amount: allowance.amount,
        unit: transactionConfig.nearUnits[allowance.unit],
      };

const getMethods = (methods) =>
  methods === 'all'
    ? {
        onlyCertain: false,
        list: [{ methodName: null }],
      }
    : {
        onlyCertain: true,
        list: methods.map((methodName) => ({
          methodName: utils.getDropdownValueForImport(methodName),
        })),
      };

export const AddKey = ({ action, transactionConfig }) => {
  action.publicKey = utils.getDropdownValueForImport(action.publicKey);

  // If it's FA key - return the base restrictions same as in the appendAction.js
  if (action.permission === 'FullAccess') {
    action.restrictions = {
      contractId: null,
      allowance: {
        isUnlimited: true,
        amount: '0.25',
        unit: transactionConfig.nearUnits.NEAR,
      },
      methods: {
        onlyCertain: false,
        list: [{ methodName: null }],
      },
    };
    return action;
  }

  action.restrictions.contractId = utils.getDropdownValueForImport(action.restrictions.contractId);
  action.restrictions.allowance = getAllowance(action.restrictions.allowance, transactionConfig);
  action.restrictions.methods = getMethods(action.restrictions.methods);

  return action;
};
