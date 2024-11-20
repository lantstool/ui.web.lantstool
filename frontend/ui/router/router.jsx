import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { App } from '../components/App.jsx';
import { GetStarted } from '../components/GetStarted/GetStarted.jsx';
import { Space } from '../components/Space/Space.jsx';
import { SpaceId } from '../components/Space/SpaceId/SpaceId.jsx';
import { SelectBlockchain } from '../components/Space/SelectBlockchain/SelectBlockchain.jsx';
import { Settings as SpaceSetting } from '../components/Space/Settings/Settings.jsx';
import { Spaces } from '../components/Spaces/Spaces.jsx';
import { CreateSpace } from '../components/CreateSpace/CreateSpace.jsx';
import { Settings as AppSettings } from '../components/Settings/Settings.jsx';
import { PageNotFound } from '../components/PageNotFound/PageNotFound.jsx';
import { nearProtocol } from './nearProtocol.jsx';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="get-started" element={<GetStarted />} />
        <Route path="space" element={<Space />}>
          <Route path=":spaceId" element={<SpaceId />}>
            <Route path="select-blockchain" element={<SelectBlockchain />} />
            <Route path="settings" element={<SpaceSetting />} />
            {nearProtocol}
          </Route>
        </Route>
        <Route path="spaces">
          <Route index element={<Spaces />} />
          <Route path="create" element={<CreateSpace />} />
        </Route>
        <Route path="settings" element={<AppSettings />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </>,
  ),
);
