import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { App } from '../components/App.jsx';
import { GetStarted } from '../components/GetStarted/GetStarted.jsx';
import { SpaceRedirect } from '../components/Space/SpaceRedirect.jsx';
import { Space } from '../components/Space/Space.jsx';
import { Spaces } from '../components/Spaces/Spaces.jsx';
import { CreateSpace } from '../components/Spaces/CreateSpace/CreateSpace.jsx';
import { PageNotFound } from '../components/PageNotFound/PageNotFound.jsx';
import { nearProtocol } from './nearProtocol/nearProtocol.jsx';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="get-started" element={<GetStarted />} />
        <Route path="space" element={<SpaceRedirect />}>
          <Route path=":spaceId" element={<Space />}>
            {nearProtocol}
          </Route>
        </Route>
        <Route path="spaces">
          <Route index element={<Spaces />} />
          <Route path="create" element={<CreateSpace />} />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </>,
  ),
);
