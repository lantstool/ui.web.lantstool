export const methods = [
  {
    type: 'status',
    text: 'Node Status',
    method: 'status',
    params: [] // none
  },
  {
    type: 'network_info',
    text: 'Network Info',
    method: 'network_info',
    params: [] // none
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
    }
  },
];
