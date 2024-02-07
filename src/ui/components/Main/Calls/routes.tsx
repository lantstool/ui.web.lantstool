import { Route } from 'react-router-dom';
import { Calls } from './Calls.tsx';
import { Call } from './Call/Call.tsx';
import { Body  } from './Call/Body/Body.tsx';
import { Result  } from './Call/Result/Result.tsx';

export const routes = (
  <Route path="calls" element={<Calls />}>
    <Route path=":callId" element={<Call />}>
      <Route index element={<Body />} />
      <Route path="result" element={<Result />} />
    </Route>
  </Route>
);
