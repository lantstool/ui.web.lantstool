import { NetworkStatus } from './NodeStatus.jsx';
import { NetworkInfo } from './NetworkInfo.jsx';
import { ValidationStatus } from './ValidationStatus/ValidationStatus.jsx';

export const NetworkForms = ({ call }) => (
  <>
    {call.type === 'status' && <NetworkStatus call={call} />}
    {call.type === 'network_info' && <NetworkInfo call={call} />}
    {call.type === 'validators' && <ValidationStatus call={call} />}
  </>
);
