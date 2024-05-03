import { createMemoryRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { Transactions } from './components/Main/Transactions/Transactions.tsx';
import { Transaction } from './components/Main/Transactions/Transaction/Transaction.tsx';
import { Networks } from './components/Main/Networks/Networks.tsx';
import { RootLoader } from './components/RootLoader.tsx';
import { NetworkLayout } from './components/NetworkLayout.tsx';
import { Calls } from './components/Main/Calls/Calls.tsx';
import { Call } from './components/Main/Calls/Call/Call.tsx';
import { routes as accounts } from './components/Main/Accounts/routes.jsx';
import { routes as keys } from './components/Main/Keys/routes.tsx';

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
