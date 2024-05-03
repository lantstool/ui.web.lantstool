export const methods = [
  {
    type: 'view_account',
    text: 'View account',
    method: 'query',
    params: {
      request_type: 'view_account',
      finality: 'final',
      account_id: '',
    },
  },
  {
    type: 'account_changes',
    text: 'View account changes',
    method: 'EXPERIMENTAL_changes',
    params: {
      changes_type: 'account_changes',
      account_ids: [],
      block_id: '',
    },
  },
];
