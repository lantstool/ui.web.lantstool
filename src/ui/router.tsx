import { createMemoryRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { Transactions } from './components/Main/Transactions/Transactions.tsx';
import { Content } from './components/Main/Transactions/Content/Content.tsx';
import { Vault } from './components/Main/Vault/Vault.tsx';
import { Account } from './components/Main/Vault/Account/Account.tsx';
import { Networks } from './components/Main/Networks/Networks.tsx';
import { RootLoader } from './components/RootLoader.tsx';
import { NetworkLayout } from './components/NetworkLayout.tsx';

export const router = createMemoryRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLoader />}>
      <Route path=":currentNetworkId" element={<NetworkLayout />}>
        <Route path="transactions" element={<Transactions />}>
          <Route path=":transactionId" element={<Content />} />
        </Route>
        <Route path="vault" element={<Vault />}>
          <Route path=":accountId" element={<Account />} />
        </Route>
        <Route path="networks" element={<Networks />} />
      </Route>
    </Route>,
  ),
);
