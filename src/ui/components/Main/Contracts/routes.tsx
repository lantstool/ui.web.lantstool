import { Route } from 'react-router-dom';
import { Contracts } from './Contracts.tsx';
import { Contract } from './Contract/Contract.tsx';

export const routes = (
  <Route path="contracts" element={<Contracts />}>
    <Route path=":contractId" element={<Contract />} />
  </Route>
);
