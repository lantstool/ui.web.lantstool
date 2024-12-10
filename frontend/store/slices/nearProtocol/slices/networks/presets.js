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
        logo: 'rpc_near.svg',
        headers: [],
        isPredefined: true,
        links: [
          { type: 'github', url: 'https://github.com/near' },
          { type: 'x', url: 'https://x.com/nearprotocol' },
          { type: 'website', url: 'https://near.org/' },
        ],
      },
      {
        id: 'rpc.mainnet.pagoda.co',
        url: 'https://rpc.mainnet.pagoda.co',
        name: 'Pagoda',
        logo: 'rpc_pagoda.svg',
        headers: [],
        isPredefined: true,
        links: [
          { type: 'x', url: 'https://x.com/PagodaPlatform' },
        ],
      },
      {
        id: 'free.rpc.fastnear.com',
        url: 'https://free.rpc.fastnear.com',
        name: 'FASTNEAR',
        logo: 'fastnear-grey-circle.png',
        headers: [],
        isPredefined: true,
        links: [
          { type: 'github', url: 'https://github.com/fastnear' },
          { type: 'x', url: 'https://x.com/fast_near' },
          { type: 'website', url: 'https://fastnear.com' },
        ],
      },
      {
        id: 'endpoints.omniatech.io/v1/near/mainnet/public',
        name: 'Omnia',
        url: 'https://endpoints.omniatech.io/v1/near/mainnet/public',
        logo: 'rpc_omnia.svg',
        headers: [],
        isPredefined: true,
        links: [
          { type: 'github', url: 'https://github.com/omniaprotocol' },
          { type: 'x', url: 'https://x.com/omnia_protocol' },
          { type: 'website', url: 'https://omniatech.io/' },
        ],
      },
    ],
    archival: [
      {
        id: 'archival-rpc.mainnet.near.org',
        url: 'https://archival-rpc.mainnet.near.org',
        name: 'NEAR',
        logo: 'rpc_near.svg',
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
        name: '1RPC',
        logo: 'rpc_1rpc.svg',
        headers: [],
        isPredefined: true,
        links: [
          { type: 'github', url: 'https://github.com/automata-network/1rpc-lite' },
          { type: 'x', url: 'https://x.com/1rpc_' },
          { type: 'website', url: 'https://docs.1rpc.io/' },
        ],
      },
      {
        id: 'near.blockpi.network/v1/rpc/public',
        url: 'https://near.blockpi.network/v1/rpc/public',
        name: 'BlockPI',
        logo: 'rpc_blockpi.svg',
        headers: [],
        isPredefined: true,
        links: [
          { type: 'x', url: 'https://x.com/RealBlockPI' },
          { type: 'medium', url: 'https://medium.com/blockpi' },
          { type: 'website', url: 'https://docs.1rpc.io/' },
        ],
      },
      {
        id: 'near.lava.build',
        url: 'https://near.lava.build',
        name: 'Lava',
        logo: 'rpc_lava.svg',
        headers: [],
        isPredefined: true,
        links: [
          { type: 'x', url: 'https://x.com/lavanetxyz' },
          { type: 'discord', url: 'https://discord.com/invite/Tbk5NxTCdA' },
          { type: 'website', url: 'https://www.lavanet.xyz/' },
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
        logo: 'rpc_near.svg',
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
        logo: 'rpc_pagoda.svg',
        headers: [],
        isPredefined: true,
        links: [
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
          { type: 'website', url: 'https://fastnear.com' },
          { type: 'github', url: 'https://github.com/fastnear' },
          { type: 'x', url: 'https://x.com/fast_near' },
        ],
      },
    ],
    archival: [
      {
        id: 'archival-rpc.testnet.near.org',
        url: 'https://archival-rpc.testnet.near.org',
        name: 'NEAR',
        logo: 'rpc_near.svg',
        headers: [],
        isPredefined: true,
        links: [
          { type: 'website', url: 'https://near.org' },
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
