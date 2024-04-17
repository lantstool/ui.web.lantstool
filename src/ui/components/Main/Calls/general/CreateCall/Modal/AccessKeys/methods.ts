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
  { type: 'view_access_key_list', text: 'View access key list', method: 'query' },
  {
    type: 'single_access_key_changes',
    text: 'View access key changes (single)',
    method: 'EXPERIMENTAL_changes',
  },
  {
    type: 'all_access_key_changes',
    text: 'View access key changes (all)',
    method: 'EXPERIMENTAL_changes',
  },
];
