import { Route } from 'react-router-dom';
import { Accounts } from './Accounts.tsx';
import { List } from './List/List.tsx';
import { Account } from './Account/Account.tsx';
import { Details } from './Account/Details/Details.tsx';
import { Contract } from './Account/Contract/Contract.tsx';
import { Keys } from './Account/Keys/Keys.tsx';

export const routes = (
  <Route path="accounts" element={<Accounts />}>
    <Route index element={<List />} />
    <Route path=":accountId" element={<Account />}>
      <Route path="details" element={<Details />} />
      <Route path="keys" element={<Keys />} />
      <Route path="contract" element={<Contract />} />
    </Route>
  </Route>
);
