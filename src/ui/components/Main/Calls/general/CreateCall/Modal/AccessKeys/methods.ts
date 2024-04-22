export const methods = [
  {
    type: 'view_access_key',
    text: 'View access key',
    method: 'query',
    params: {
      request_type: 'view_access_key',
      finality: 'final',
      account_id: '',
      public_key: '',
    },
  },
  {
    type: 'view_access_key_list',
    text: 'View access key list',
    method: 'query',
    params: {
      request_type: 'view_access_key_list',
      finality: 'final',
      account_id: '',
    },
  },
  {
    type: 'single_access_key_changes',
    text: 'View access key changes (single)',
    method: 'EXPERIMENTAL_changes',
    params: {
      changes_type: 'single_access_key_changes',
      finality: 'final',
      //The parameters account_id and public_key are stored at a higher level
      // for ease of interaction with them, real schema is :
      // keys: [{account_id: '',public_key: ''}],
      account_id: '',
      public_key: '',
    },
  },
  {
    type: 'all_access_key_changes',
    text: 'View access key changes (all)',
    method: 'EXPERIMENTAL_changes',
    params: {
      changes_type: 'all_access_key_changes',
      account_ids: [],
      block_id: '',
    },
  },
];
