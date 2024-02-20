import { Route, useParams } from 'react-router-dom';
import { Keys } from './Keys.tsx';
import {Key} from "./Key/Key.tsx";

export const routes = (
    <Route path="keys" element={<Keys />}>
      <Route index path=":keyId" element={<Key/>} />
    </Route>
)


