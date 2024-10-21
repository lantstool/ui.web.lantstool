import { ViewAccessKey } from './ViewAccessKey.jsx';
import { ViewAccessKeyList } from './ViewAccessKeyList.jsx';
import { ViewAccessKeyChangesSingle } from './ViewAccessKeyChangesSingle.jsx';
import { ViewAccessKeyChangesAll } from './ViewAccessKeyChangesAll.jsx';

export const AccessKeysForms = ({ type, form }) => (
  <>
    {type === 'view_access_key' && <ViewAccessKey form={form} />}
    {type === 'view_access_key_list' && <ViewAccessKeyList form={form} />}
    {type === 'single_access_key_changes' && <ViewAccessKeyChangesSingle form={form} />}
    {type === 'all_access_key_changes' && <ViewAccessKeyChangesAll form={form} />}
  </>
);
