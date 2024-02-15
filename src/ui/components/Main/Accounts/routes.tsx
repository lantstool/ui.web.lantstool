import { Route } from 'react-router-dom';
import { Accounts } from './Accounts.tsx';
import { List } from './List/List.tsx';
import { Account } from './Account/Account.tsx';
import { General } from './Account/General/General.tsx';
import { Contract } from './Account/Contract/Contract.tsx';

export const routes = (
  <Route path="accounts" element={<Accounts />}>
    <Route index element={<List />} />
    <Route path=":accountId" element={<Account />}>
      <Route path="general" element={<General />} />
      <Route path="keys" element={<div>Keys</div>} />
      <Route path="contract" element={<Contract />} />
    </Route>
  </Route>
);
