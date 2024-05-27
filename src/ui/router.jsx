import { createMemoryRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { Transactions } from './components/Main/Transactions/Transactions.jsx';
import { Transaction } from './components/Main/Transactions/Transaction/Transaction.jsx';
import { Networks } from './components/Main/Networks/Networks.jsx';
import { RootLoader } from './components/RootLoader.jsx';
import { NetworkLayout } from './components/NetworkLayout.jsx';
import { Calls } from './components/Main/Calls/Calls.jsx';
import { Call } from './components/Main/Calls/Call/Call.jsx';
import { routes as accounts } from './components/Main/Accounts/routes.jsx';
import { routes as keys } from './components/Main/Keys/routes.jsx';

export const router = createMemoryRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLoader />}>
      <Route path=":currentNetworkId" element={<NetworkLayout />}>
        {keys}
        {accounts}
        <Route path="transactions" element={<Transactions />}>
          <Route path=":transactionId" element={<Transaction />} />
        </Route>
        <Route path="calls" element={<Calls />}>
          <Route path=":callId" element={<Call />} />
        </Route>
        <Route path="networks" element={<Networks />} />
      </Route>
    </Route>,
  ),
);
