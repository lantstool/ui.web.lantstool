import { Route } from 'react-router-dom';
import { Accounts } from './Accounts.jsx';
import { List } from './List/List.jsx';
import { Account } from './Account/Account.jsx';
import { Details } from './Account/Details/Details.jsx';
import { Keys } from './Account/Keys/Keys.jsx';

export const routes = (
  <Route path="accounts" element={<Accounts />}>
    <Route index element={<List />} />
    <Route path=":accountId" element={<Account />}>
      <Route path="details" element={<Details />} />
      <Route path="keys" element={<Keys />} />
    </Route>
  </Route>
);
