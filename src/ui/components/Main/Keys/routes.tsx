import { Route } from 'react-router-dom';
import { List } from './List/List.tsx';
import { Key } from './Key/Key.tsx';
import { Keys } from './Keys.tsx';

export const routes = (
  <Route path="keys" element={<Keys />}>
    <Route index element={<List />} />
    <Route path=":key" element={<Key />} />
  </Route>
);
