import { NetworkStatus } from './NodeStatus.tsx';
import { NetworkInfo } from './NetworkInfo.tsx';
import { ValidationStatus } from './ValidationStatus/ValidationStatus.tsx';

export const NetworkForms = ({ call }: any) => (
  <>
    {call.type === 'status' && <NetworkStatus call={call} />}
    {call.type === 'network_info' && <NetworkInfo call={call} />}
    {call.type === 'validators' && <ValidationStatus call={call} />}
  </>
);
