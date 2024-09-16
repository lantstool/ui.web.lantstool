import { Route } from 'react-router-dom';
import { NearProtocol } from '../../components/Space/NearProtocol/NearProtocol.jsx';
import { Networks } from '../../TestComponents/depricated/Networks/Networks.jsx';
import { CreateNetwork } from '../../components/Space/NearProtocol/Networks/CreateNetwork/CreateNetwork.jsx';
import { network } from './network.jsx';

export const nearProtocol = (
  <Route path="near-protocol" element={<NearProtocol />}>
    <Route path="networks">
      <Route index element={<Networks />} />
      <Route path="create" element={<CreateNetwork />} />
    </Route>
    {network}
  </Route>
);
