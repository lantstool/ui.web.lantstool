export const methods = [
  {
    label: 'Access key',
    options: [
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
    ],
  },
  {
    label: 'Accounts',
    options: [
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
    ],
  },
  {
    label: 'Block',
    options: [
      {
        type: 'block',
        text: 'View access key',
        method: 'block',
        params: {
          type: 'finality',
          finality: 'final',
          block_id: '',
        },
      },
    ],
  },
  {
    label: 'Chunk',
    options: [
      {
        type: 'EXPERIMENTAL_changes_in_block',
        text: 'Changes in Block',
        method: 'EXPERIMENTAL_changes_in_block',
        params: {
          type: 'finality',
          finality: 'final',
          block_id: '',
        },
      },
      {
        type: 'chunk',
        text: 'Chunk Details',
        method: 'chunk',
        params: {
          type: 'chunk_id',
          chunk_id: '',
          block_id: '',
          shard_id: '',
        },
      },
    ],
  },
  {
    label: 'Contracts',
    options: [
      {
        type: 'view_code',
        text: 'View contract code',
        method: 'query',
        params: {
          request_type: 'view_code',
          finality: 'final', //final
          account_id: '',
        },
      },
      {
        type: 'view_state',
        text: 'View contract state',
        method: 'query',
        params: {
          request_type: 'view_state',
          finality: 'final', //final
          account_id: '',
          prefix_base64: '',
        },
      },
      {
        type: 'data_changes',
        text: 'View contract state changes',
        method: 'EXPERIMENTAL_changes',
        params: {
          changes_type: 'data_changes',
          account_ids: [], //['guest-book.testnet']
          key_prefix_base64: '',
          block_id: '',
        },
      },
      {
        type: 'contract_code_changes',
        text: 'View contract code changes',
        method: 'EXPERIMENTAL_changes',
        params: {
          changes_type: 'contract_code_changes',
          account_ids: [], //['dev-1602714453032-7566969']
          block_id: '',
        },
      },
      {
        type: 'call_function',
        text: 'Call a contract function',
        method: 'query',
        params: {
          request_type: 'call_function',
          finality: 'final', //final
          account_id: '',
          method_name: '',
          args_base64: '',
        },
      },
    ],
  },
  {
    label: 'Gas',
    options: [
      {
        type: 'gas_price',
        text: 'Gas Price',
        method: 'gas_price',
        params: {
          type: 'block',
          block: '',
          lastBlock: null,
        },
      },
    ],
  },
  {
    label: 'Network',
    options: [
      {
        type: 'status',
        text: 'Node Status',
        method: 'status',
        params: [], // none
      },
      {
        type: 'network_info',
        text: 'Network Info',
        method: 'network_info',
        params: [], // none
      },
      {
        type: 'validators',
        text: 'Validation Status',
        method: 'validators',
        params: {
          type: 'block_id',
          // block_number: '',
          // block_hash: '',
          epoch_id: '',
          block_id: '',
        },
      },
    ],
  },
  {
    label: 'Protocol',
    options: [
      {
        type: 'EXPERIMENTAL_genesis_config',
        text: 'Genesis Config',
        method: 'EXPERIMENTAL_genesis_config',
      },
      {
        type: 'EXPERIMENTAL_protocol_config',
        text: 'Protocol Config',
        method: 'EXPERIMENTAL_protocol_config',
        params: {
          type: 'finality',
          finality: 'final',
          block_id: '',
        },
      },
    ],
  },
  {
    label: 'Transactions',
    options: [
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
    ],
  },
];