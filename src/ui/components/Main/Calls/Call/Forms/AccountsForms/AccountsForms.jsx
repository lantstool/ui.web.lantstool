import { ViewAccount } from './ViewAccount.jsx';
import { ViewAccountChanges } from './ViewAccountChanges.jsx';

export const AccountsForms = ({ call }) => (
  <>
    {call.type === 'view_account' && <ViewAccount call={call} />}
    {call.type === 'account_changes' && <ViewAccountChanges call={call} />}
  </>
);
