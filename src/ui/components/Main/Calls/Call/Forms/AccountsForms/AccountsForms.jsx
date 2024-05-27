import { ViewAccount } from './ViewAccount.jsx';
import { ViewAccountChanges } from './ViewAccountChanges.jsx';

export const AccountsForms = ({ form, type }) => (
  <>
    {type === 'view_account' && <ViewAccount form={form} />}
    {type === 'account_changes' && <ViewAccountChanges form={form} />}
  </>
);
