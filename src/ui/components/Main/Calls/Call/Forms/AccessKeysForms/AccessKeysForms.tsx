import { ViewAccessKey } from './ViewAccessKey.tsx';
import { ViewAccessKeyList } from './ViewAccessKeyList.tsx';
import { ViewAccessKeyChangesSingle } from './ViewAccessKeyChangesSingle.tsx';
import { ViewAccessKeyChangesAll } from './ViewAccessKeyChangesAll.tsx';

export const AccessKeysForms = ({ call }: any) => (
  <>
    {call.type === 'view_access_key' && <ViewAccessKey call={call} />}
    {call.type === 'view_access_key_list' && <ViewAccessKeyList call={call} />}
    {call.type === 'single_access_key_changes' && <ViewAccessKeyChangesSingle call={call} />}
    {call.type === 'all_access_key_changes' && <ViewAccessKeyChangesAll call={call} />}
  </>
);
