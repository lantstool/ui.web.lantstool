
export const navHistory = {};

export const navHistory1 = {
  '': {
    next: 'space',
    space: {
      next: 'shared',
      shared: {
        next: 'near-protocol',
        'near-protocol': {
          next: 'testnet',
          testnet: {
            next: 'transactions',
            transactions: {
              next: '1',
            },
          },
          mainnet: {
            next: 'calls',
            calls: {
              next: '1c',
            },
          },
        },
        solana: {
          next: 'localnet',
          localnet: {
            next: 'accounts',
            accounts: {
              next: 'account',
              account: {
                next: 'keys',
              },
            },
          },
        },
      },
    },
  },
};
/*
Якщо я в дропдауні вибираю солану то я просто йду і міняю shared.next = solana
а дальше рендеринг роутів робить все сам - переходить на солану, диться на next або default
 */
