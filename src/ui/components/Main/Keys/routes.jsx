import { Route } from 'react-router-dom';
import { List } from './List/List.jsx';
import { Key } from './Key/Key.jsx';
import { Keys } from './Keys.jsx';

export const routes = (
  <Route path="keys" element={<Keys />}>
    <Route index element={<List />} />
    <Route path=":key" element={<Key />} />
  </Route>
);
