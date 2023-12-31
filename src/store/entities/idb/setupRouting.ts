export const setupRouting = async (db: any, ids: any) => {
  const routing = db.createObjectStore('routing', { keyPath: 'key' });

  await routing.add({
    spaceId: ids.spaceId,
  });
};

const currentRoute = {
  user: 'user1',
  space: 'space1',
  network: 'network1',
  transaction: 'tx1',
};

const users = {
  user1: {
    route: '/spaces:space1/networks:network1',
    spaces: {
      selected: 'space1',
      space1: {
        networks: {
          network1: {
            transaction: 'tx1',
            account: 'account1',
          },
          network2: {
            transaction: 'tx3',
            account: 'account2',
          },
        },
      },
      space2: {
        networks: {
          selected: 'network3',
          network3: {
            transaction: 'tx5',
            account: 'account5',
          },
          network4: {
            transaction: 'tx6',
            account: 'account6',
          },
        },
      },
    },
  },
  user2: {
    route: 'spaces.space2.networks.network3',
    spaces: {},
  }
};
