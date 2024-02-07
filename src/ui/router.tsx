import { createMemoryRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { Transactions } from './components/Main/Transactions/Transactions.tsx';
import { Content } from './components/Main/Transactions/Content/Content.tsx';
import { Account } from './components/Main/Vault/Account/Account.tsx';
import { Networks } from './components/Main/Networks/Networks.tsx';
import { RootLoader } from './components/RootLoader.tsx';
import { NetworkLayout } from './components/NetworkLayout.tsx';
import { Keys } from './components/Main/Keys/Keys.tsx';
import { Accounts } from './components/Main/Accounts/Accounts.tsx';
import { routes as calls } from "./components/Main/Calls/routes.tsx";

export const router = createMemoryRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLoader />}>
      <Route path=":currentNetworkId" element={<NetworkLayout />}>
        {/* Keys */}
        <Route path="keys" element={<Keys />} />
        {/* Accounts */}
        <Route path="accounts" element={<Accounts />}>
          <Route path=":accountId" element={<Account />} />
        </Route>
        {/* Transactions */}
        <Route path="transactions" element={<Transactions />}>
          <Route path=":transactionId" element={<Content />} />
        </Route>
        {calls}
        {/* Networks */}
        <Route path="networks" element={<Networks />} />
      </Route>
    </Route>,
  ),
);
