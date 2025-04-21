import cn from './ConfirmationModal.module.scss';

const deleteAccount = ({ accountId }) => ({
  title: (
    <>
      Delete <span className={cn.accountId}>{accountId}?</span>
    </>
  ),
  description: `
      Are you sure you want to delete this call? 
      This action will permanently remove it. 
      Be sure to export any important data before proceeding.
    `,
  submitButtonText: 'Delete Account',
});

const clearContractState = ({ accountId }) => ({
  title: (
    <>
      Clear the contract state of <span className={cn.accountId}>{accountId}?</span>
    </>
  ),
  description: `
      Are you sure you want to delete this call? 
      This action will permanently remove it. 
      Be sure to export any important data before proceeding.
    `,
  submitButtonText: 'Clear Contract State',
});

const deleteAccessKeys = ({ accountId }) => ({
  title: (
    <>
      Delete access keys of <span className={cn.accountId}>{accountId}?</span>
    </>
  ),
  description: `
      Are you sure you want to delete this call? 
      This action will permanently remove it. 
      Be sure to export any important data before proceeding.
    `,
  submitButtonText: 'Delete Access Keys',
});

export const texts = {
  deleteAccount,
  clearContractState,
  deleteAccessKeys,
};
