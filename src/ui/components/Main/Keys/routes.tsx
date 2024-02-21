import { Route } from 'react-router-dom';
import { Keys } from './Keys.tsx';
import { Key } from './Key/Key.tsx';
import { RoutWrapper } from './RoutWrapper.tsx';

export const routes = (
  <Route path="keys" element={<RoutWrapper />}>
    <Route index element={<Keys />} />
    <Route path=":key" element={<Key />} />
  </Route>
);
