import { createRoutesFromElements, Route, createBrowserRouter, Link } from 'react-router-dom';

import { TestApp } from './TestApp.jsx';
import { Space } from './Space/Space.jsx';
import { Solana } from './Space/Solana/Solana.jsx';
import { SolanaNetwork } from './Space/Solana/SolanaNetwork.jsx';
import { Network } from './Space/nearProtocol/Network/Network.jsx';
import { Transactions } from './Space/nearProtocol/Network/Transactions/Transactions.jsx';
import { Transaction } from './Space/nearProtocol/Network/Transactions/Transaction/Transaction.jsx';
import { Calls } from './Space/nearProtocol/Network/Calls/Calls.jsx';
import { Call } from './Space/nearProtocol/Network/Calls/Call/Call.jsx';
import { navHistory } from './navHistory.js';

const PageNotFound = () => {
  return (
    <div>
      <p>Page Not Found</p>
      <Link to="/public">Got it!</Link>
    </div>
  );
};

export const testRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<TestApp navHistory={navHistory} />}>
        <Route path="space/:spaceId" element={<Space navHistory={navHistory} />}>
          <Route path="near-protocol/networks" element={<div>Networks</div>} />
          <Route path="near-protocol/:networkId" element={<Network navHistory={navHistory} />}>
            <Route path="transactions" element={<Transactions navHistory={navHistory} />}>
              <Route path=":transactionId" element={<Transaction navHistory={navHistory} />} />
            </Route>
            <Route path="calls" element={<Calls navHistory={navHistory} />}>
              <Route path=":callId" element={<Call navHistory={navHistory} />} />
            </Route>
          </Route>
          <Route path="solana" element={<Solana navHistory={navHistory} />}>
            <Route path=":networkId" element={<SolanaNetwork navHistory={navHistory} />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </>,
  ),
);
