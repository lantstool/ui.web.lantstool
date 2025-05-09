import { Route } from 'react-router-dom';
import { Utils } from './Utils.jsx';
import { KeyGenerator } from './KeyGenerator/KeyGenerator.jsx';
import { UnitConverter } from './UnitConverter/UnitConverter.jsx';
import { AccountCleaner } from './AccountCleaner/AccountCleaner.jsx';

export const router = (
  <Route path="utils" element={<Utils />}>
    <Route path="key-generator" element={<KeyGenerator />} />
    <Route path="unit-converter" element={<UnitConverter />} />
    <Route path="account-cleaner" element={<AccountCleaner />} />
  </Route>
);
