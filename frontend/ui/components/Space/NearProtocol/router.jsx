import { Route } from 'react-router-dom';
import { NearProtocol } from './NearProtocol.jsx';
import { Account } from './Network/Accounts/Account/Account.jsx';
import { AccountKeys } from './Network/Accounts/Account/AccountKeys/AccountKeys.jsx';
import { Details } from './Network/Accounts/Account/Details/Details.jsx';
import { Accounts } from './Network/Accounts/Accounts.jsx';
import { List as AccountsList } from './Network/Accounts/List/List.jsx';
import { Call } from './Network/Calls/Call/Call.jsx';
import { Calls } from './Network/Calls/Calls.jsx';
import { Key } from './Network/Keys/Key/Key.jsx';
import { Keys } from './Network/Keys/Keys.jsx';
import { List as KeysList } from './Network/Keys/List/List.jsx';
import { Network } from './Network/Network.jsx';
import { Settings } from './Network/Settings/Settings.jsx';
import { Transaction } from './Network/Transactions/Transaction/Transaction.jsx';
import { Transactions } from './Network/Transactions/Transactions.jsx';
import { Networks } from './Networks/Networks.jsx';
import { CreateNetwork } from './CreateNetwork/CreateNetwork.jsx';
import { router as utils } from './Network/Utils/router.jsx';

export const router = (
  <Route path="near-protocol" element={<NearProtocol />}>
    <Route path="networks">
      <Route index element={<Networks />} />
      <Route path="create" element={<CreateNetwork />} />
    </Route>
    <Route path=":networkId" element={<Network />}>
      <Route path="transactions" element={<Transactions />}>
        <Route path=":transactionId" element={<Transaction />} />
      </Route>

      <Route path="calls" element={<Calls />}>
        <Route path=":callId" element={<Call />} />
      </Route>

      <Route path="keys" element={<Keys />}>
        <Route index element={<KeysList />} />
        <Route path=":publicKey" element={<Key />} />
      </Route>

      <Route path="accounts" element={<Accounts />}>
        <Route index element={<AccountsList />} />
        <Route path=":accountId" element={<Account />}>
          <Route path="details" element={<Details />} />
          <Route path="keys" element={<AccountKeys />} />
        </Route>
      </Route>
      {utils}
      <Route path="settings" element={<Settings />} />
    </Route>
  </Route>
);
