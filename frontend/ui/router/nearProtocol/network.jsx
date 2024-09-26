import { Route } from 'react-router-dom';
import { Network } from '../../components/Space/NearProtocol/Network/Network.jsx';
import { Account } from '../../components/Space/NearProtocol/Network/Accounts/Account/Account.jsx';
import { Details } from '../../components/Space/NearProtocol/Network/Accounts/Account/Details/Details.jsx';
import { Accounts } from '../../components/Space/NearProtocol/Network/Accounts/Accounts.jsx';
import { List as AccountsList } from '../../components/Space/NearProtocol/Network/Accounts/List/List.jsx';
import { AccountKeys } from '../../components/Space/NearProtocol/Network/Accounts/Account/AccountKeys/AccountKeys.jsx';
import { Call } from '../../components/Space/NearProtocol/Network/Calls/Call/Call.jsx';
import { Calls } from '../../components/Space/NearProtocol/Network/Calls/Calls.jsx';
import { Key } from '../../components/Space/NearProtocol/Network/Keys/Key/Key.jsx';
import { Keys } from '../../components/Space/NearProtocol/Network/Keys/Keys.jsx';
import { List as KeysList } from '../../components/Space/NearProtocol/Network/Keys/List/List.jsx';
import { Transaction } from '../../components/Space/NearProtocol/Network/Transactions/Transaction/Transaction.jsx';
import { Transactions } from '../../components/Space/NearProtocol/Network/Transactions/Transactions.jsx';
import { Settings } from '../../components/Space/NearProtocol/Network/Settings/Settings.jsx';
import { Tools } from '../../components/Space/NearProtocol/Network/Tools/Tools.jsx';

export const network = (
  <Route path=":networkId" element={<Network />}>
    <Route path="transactions" element={<Transactions />}>
      <Route path=":transactionId" element={<Transaction />} />
    </Route>

    <Route path="calls" element={<Calls />}>
      <Route path=":callId" element={<Call />} />
    </Route>

    <Route path="keys" element={<Keys />}>
      <Route index element={<KeysList />} />
      <Route path=":key" element={<Key />} />
    </Route>

    <Route path="accounts" element={<Accounts />}>
      <Route index element={<AccountsList />} />
      <Route path=":accountId" element={<Account />}>
        <Route path="details" element={<Details />} />
        <Route path="keys" element={<AccountKeys />} />
      </Route>
    </Route>

    <Route path="tools" element={<Tools />} />
    <Route path="settings" element={<Settings />} />
  </Route>
);
