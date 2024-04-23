import { ViewAccount } from './ViewAccount.tsx';
import { ViewAccountChanges } from './ViewAccountChanges.tsx';

export const AccountsForms = ({ call }: any) => (
  <>
    {call.type === 'view_account' && <ViewAccount call={call} />}
    {call.type === 'account_changes' && <ViewAccountChanges call={call} />}
  </>
);
