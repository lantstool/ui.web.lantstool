import cn from './ConfirmationModal.module.scss';

const warningText = (
  <>
    This operation is irreversible and may take a few minutes to complete.
    <br />
    Do not refresh or close the browser tab during the process — this might interrupt the operation
    and cause unexpected results.
  </>
);

const deleteAccount = ({ accountId }) => ({
  title: (
    <>
      Delete <span className={cn.accountId}>{accountId}?</span>
    </>
  ),
  description: warningText,
  submitButtonText: 'Delete Account',
});

const clearContractState = ({ accountId }) => ({
  title: (
    <>
      Clear the contract state of <span className={cn.accountId}>{accountId}?</span>
    </>
  ),
  description: warningText,
  submitButtonText: 'Clear Contract State',
});

const deleteAccessKeys = ({ accountId }) => ({
  title: (
    <>
      Delete access keys of <span className={cn.accountId}>{accountId}?</span>
    </>
  ),
  description: warningText,
  submitButtonText: 'Delete Access Keys',
});

export const texts = {
  deleteAccount,
  clearContractState,
  deleteAccessKeys,
};
