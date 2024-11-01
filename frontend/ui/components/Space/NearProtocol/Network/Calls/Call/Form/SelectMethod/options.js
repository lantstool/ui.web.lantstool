export const options = [
  {
    label: 'Account',
    options: [
      {
        value: 'getAccountData',
        label: 'Get Account Data',
      },
      {
        value: 'getAccountChanges',
        label: 'Get Account Changes',
      },
    ],
  },
  {
    label: 'Contract',
    options: [
      {
        value: 'getContractWasm',
        label: 'Get Contract WASM',
      },
      {
        value: 'getContractState',
        label: 'Get Contract State',
      },
      {
        value: 'callContractViewMethod',
        label: 'Call Contract View Method',
      },
    ],
  },
];
