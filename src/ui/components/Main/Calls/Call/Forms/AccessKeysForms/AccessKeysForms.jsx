import { ViewAccessKey } from './ViewAccessKey.jsx';
import { ViewAccessKeyList } from './ViewAccessKeyList.jsx';
import { ViewAccessKeyChangesSingle } from './ViewAccessKeyChangesSingle.jsx';
import { ViewAccessKeyChangesAll } from './ViewAccessKeyChangesAll.jsx';

export const AccessKeysForms = ({ call }) => (
  <>
    {call.type === 'view_access_key' && <ViewAccessKey call={call} />}
    {call.type === 'view_access_key_list' && <ViewAccessKeyList call={call} />}
    {call.type === 'single_access_key_changes' && <ViewAccessKeyChangesSingle call={call} />}
    {call.type === 'all_access_key_changes' && <ViewAccessKeyChangesAll call={call} />}
  </>
);
