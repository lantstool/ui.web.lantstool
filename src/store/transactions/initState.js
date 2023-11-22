export const initState = {
  active: '',
  list: [],
  map: {
    '1a': {
      userId: '1u',
      spaceId: '1s',
      networkId: '1n',
      transactionId: '1a',
      name: 'Transaction 1',
      createdAt: '2023-01-01',
      signer: {
        accountId: 'eclipseer.testnet',
        source: 'Input',
      },
      signerKey: {
        source: 'Manually',
        publicKey: 'ed25519:FijQaWHjbJdf8wDQmGzcLGEpqRt2HMuVF9gCXsFhMqJn',
        privateKey:
          'ed25519:5GyJ5aHaXGzH4CogoCom4L7ATwVQRHWQXuYnYxP3NGrbksuer51uECB8C3BVHkdVR5VLqyhtnfhDUVTiCGkxeWdL',
        seedPhrase: 'gospel leave reject define cigar crawl vacant cute file mixture ocean swamp',
      },
      receiver: {
        type: 'existing', // newNamed // newImplicit
        existing: {
          accountId: 'eclpseeer-multisig-test-1.testnet',
        },
        newNamed: {
          accountId: '',
        },
        newImplicit: {
          accountId: '',
          seedPhrase: '',
          privateKey: '',
          publicKey: '',
        },
      },
      actions: [
        {
          actionId: 'ttt251',
          name: 'Transfer',
          type: 'Transfer',
          amount: '0.001',
        },
        {
          actionId: 'd1d1',
          name: 'Add Key',
          type: 'AddKey',
          publicKey: 'abc:123',
          permission: {
            type: 'FullAccess', // FullAccess
            restrictions: {
              allowedAllowance: 'Limited', // Limited
              allowance: 0.5,
              receiverId: 'abc.near',
              allowedMethods: 'All', // Certain
              methodNames: [{ name: '' }],
            },
          },
          nonce: '0',
        },
      ],
    },
  },
};
