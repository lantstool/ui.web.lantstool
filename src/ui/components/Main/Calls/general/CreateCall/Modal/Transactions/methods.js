export const methods = [
  {
    type: 'tx',
    text: 'Transaction Status',
    method: 'tx',
    params: {
      tx_hash: '',
      sender_account_id: '',
      wait_until: '',
    },
  },
  {
    type: 'EXPERIMENTAL_tx_status',
    text: 'Transaction Status with Receipts',
    method: 'EXPERIMENTAL_tx_status',
    params: {
      tx_hash: '',
      sender_account_id: '',
      wait_until: '',
    },
  },
  {
    type: 'EXPERIMENTAL_receipt',
    text: 'Receipt by ID',
    method: 'EXPERIMENTAL_receipt',
    params: {
      receipt_id: '',
    },
  },
];
