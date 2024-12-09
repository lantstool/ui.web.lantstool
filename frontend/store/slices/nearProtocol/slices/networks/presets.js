const mainnet = {
  networkId: 'mainnet',
  activeRpc: {
    regular: { autoBalance: true, rpc: null },
    archival: { autoBalance: true, rpc: null },
  },
  rpcList: {
    regular: [
      {
        id: 'rpc.mainnet.near.org',
        name: 'NEAR',
        url: 'https://rpc.mainnet.near.org',
        logo: 'near-protocol-green-circle.png',
        headers: [],
        isPredefined: true,
        links: [
          { type: 'github', url: 'https://github.com/near' },
          { type: 'x', url: 'https://x.com/nearprotocol' },
          { type: 'website', url: 'https://near.org/' },
        ],
      },
    ],
    archival: [
      {
        id: 'archival-rpc.mainnet.near.org',
        url: 'https://archival-rpc.mainnet.near.org',
        name: 'NEAR Archival',
        logo: 'near-protocol-green-circle.png',
        headers: [],
        isPredefined: true,
        links: [
          { type: 'github', url: 'https://github.com/near' },
          { type: 'x', url: 'https://x.com/nearprotocol' },
          { type: 'website', url: 'https://near.org/' },
        ],
      },
      {
        id: '1rpc.io/near',
        url: 'https://1rpc.io/near',
        name: '1RPC Archival',
        logo: '1rpc',
        headers: [],
        isPredefined: true,
        links: [
          { type: 'github', url: 'https://github.com/automata-network/1rpc-lite' },
          { type: 'x', url: 'https://x.com/1rpc_' },
          { type: 'website', url: 'https://docs.1rpc.io/' },
        ],
      },
      {
        id: 'rpc.mainnet.pagoda.co',
        url: 'https://rpc.mainnet.pagoda.co',
        name: 'Pagoda',
        logo: 'pagoda-black-circle.png',
        headers: [],
        isPredefined: true,
        links: [
          { type: 'github', url: 'https://github.com/near' },
          { type: 'x', url: 'https://x.com/PagodaPlatform' },
          { type: 'website', url: 'https://www.pagoda.co/console' },
        ],
      },
    ],
  },
};

const testnet = {
  networkId: 'testnet',
  activeRpc: {
    regular: { autoBalance: true, rpc: null },
    archival: { autoBalance: true, rpc: null },
  },
  rpcList: {
    regular: [
      {
        id: 'rpc.testnet.near.org',
        url: 'https://rpc.testnet.near.org',
        name: 'NEAR',
        logo: 'near-protocol-green-circle.png',
        headers: [],
        isPredefined: true,
        links: [
          { type: 'website', url: 'https://near.org/' },
          { type: 'github', url: 'https://github.com/near' },
          { type: 'x', url: 'https://x.com/nearprotocol' },
        ],
      },
      {
        id: 'rpc.testnet.pagoda.co',
        url: 'https://rpc.testnet.pagoda.co',
        name: 'Pagoda',
        logo: 'pagoda-black-circle.png',
        headers: [],
        isPredefined: true,
        links: [
          { type: 'website', url: 'https://www.pagoda.co/console' },
          { type: 'github', url: 'https://github.com/near' },
          { type: 'x', url: 'https://x.com/PagodaPlatform' },
        ],
      },
      {
        id: 'test.rpc.fastnear.com',
        url: 'https://test.rpc.fastnear.com',
        name: 'FASTNEAR',
        logo: 'fastnear-grey-circle.png',
        headers: [],
        isPredefined: true,
        links: [
          { type: 'github', url: 'https://github.com/fastnear/' },
          { type: 'x', url: 'https://x.com/fast_near' },
          { type: 'website', url: 'https://fastnear.com/' },
        ],
      },
    ],
    archival: [
      {
        id: 'archival-rpc.testnet.near.org',
        url: 'https://archival-rpc.testnet.near.org',
        name: 'NEAR Archival',
        logo: 'near-protocol-green-circle.png',
        headers: [],
        isPredefined: true,
        links: [
          { type: 'website', url: 'https://near.org/' },
          { type: 'github', url: 'https://github.com/near' },
          { type: 'x', url: 'https://x.com/nearprotocol' },
        ],
      },
    ],
  },
};

// The presets order will determinate what preset will be active
// on the Create Network page - it will be a first key
export const presets = {
  testnet,
  mainnet,
};
