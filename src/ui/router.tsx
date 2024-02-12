import { createMemoryRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { Transactions } from './components/Main/Transactions/Transactions.tsx';
import { Content } from './components/Main/Transactions/Content/Content.tsx';
import { Networks } from './components/Main/Networks/Networks.tsx';
import { RootLoader } from './components/RootLoader.tsx';
import { NetworkLayout } from './components/NetworkLayout.tsx';
import { Keys } from './components/Main/Keys/Keys.tsx';
import { Calls } from './components/Main/Calls/Calls.tsx';
import { Call } from './components/Main/Calls/Call/Call.tsx';
import { routes as accounts } from './components/Main/Accounts/routes.tsx';

export const router = createMemoryRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLoader />}>
      <Route path=":currentNetworkId" element={<NetworkLayout />}>
        {/* Keys */}
        <Route path="keys" element={<Keys />} />
        {accounts}
        {/* Transactions */}
        <Route path="transactions" element={<Transactions />}>
          <Route path=":transactionId" element={<Content />} />
        </Route>
        {/* Calls */}
        <Route path="calls" element={<Calls />}>
          <Route path=":callId" element={<Call />} />
        </Route>
        {/* Networks */}
        <Route path="networks" element={<Networks />} />
      </Route>
    </Route>,
  ),
);
