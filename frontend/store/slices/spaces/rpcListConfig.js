// Not available genesis config - 'https://near.drpc.org'
//
//  rpc with error
//   'https://rpc.near.gateway.fm/',
//   'thttps://getblock.io/nodes/near/',
//   'https://near.lava.build',
//   'https://near.lavenderfive.com/',
//   'https://nodereal.io/api-marketplace/near-rpc',
//   'https://near.nownodes.io/',
//   'https://api.seracle.com/saas/baas/rpc/near/mainnet/public/',
//
//  archival rpc
//   'https://rpc.mainnet.pagoda.co',
//   'https://1rpc.io/near',
//   'fast-near web4',
//   'https://free.rpc.fastnear.com',
//   'https://endpoints.omniatech.io/v1/near/mainnet/public',
//

export const rpcListConfig = {
  mainnet: {
    regular: [
      {
        url: 'https://rpc.mainnet.near.org',
        name: 'NEAR',
        logo: 'near.svg',
        header: null,
        isPreset: true,
        links: [
          { type: 'github', url: 'https://github.com/near' },
          { type: 'x', url: 'https://x.com/nearprotocol' },
          { type: 'website', url: 'https://near.org/' },
        ],
      },
    ],
    archival: [
      {
        url: 'https://archival-rpc.mainnet.near.org',
        name: 'NEAR Archival',
        logo: 'near.svg',
        header: null,
        isPreset: true,
        links: [
          { type: 'github', url: 'https://github.com/near' },
          { type: 'x', url: 'https://x.com/nearprotocol' },
          { type: 'website', url: 'https://near.org/' },
        ],
      },
      {
        url: 'https://1rpc.io/near',
        name: '1RPC Archival',
        logo: '1rpc.svg',
        header: null,
        isPreset: true,
        links: [
          { type: 'github', url: 'https://github.com/automata-network/1rpc-lite' },
          { type: 'x', url: 'https://x.com/1rpc_' },
          { type: 'website', url: 'https://docs.1rpc.io/' },
        ],
      },
      {
        url: 'https://rpc.mainnet.pagoda.co',
        name: 'Pagoda',
        logo: 'pagoda.svg',
        header: null,
        isPreset: true,
        links: [
          { type: 'github', url: 'https://github.com/near' },
          { type: 'x', url: 'https://x.com/PagodaPlatform' },
          { type: 'website', url: 'https://www.pagoda.co/console' },
        ],
      },
    ],
  },

  testnet: {
    regular: [
      {
        url: 'https://rpc.testnet.near.org',
        name: 'NEAR',
        logo: 'near.svg',
        header: null,
        isPreset: true,
        links: [
          { type: 'github', url: 'https://github.com/near' },
          { type: 'x', url: 'https://x.com/nearprotocol' },
          { type: 'website', url: 'https://near.org/' },
        ],
      },
      {
        url: 'https://rpc.testnet.pagoda.co',
        name: 'Pagoda',
        logo: 'pagoda.svg',
        header: null,
        isPreset: true,
        links: [
          { type: 'github', url: 'https://github.com/near' },
          { type: 'x', url: 'https://x.com/PagodaPlatform' },
          { type: 'website', url: 'https://www.pagoda.co/console' },
        ],
      },
      {
        url: 'https://test.rpc.fastnear.com',
        name: 'FASTNEAR',
        logo: 'fastNear.svg',
        header: null,
        isPreset: true,
        links: [
          { type: 'github', url: 'https://github.com/fastnear/' },
          { type: 'x', url: 'https://x.com/fast_near' },
          { type: 'website', url: 'https://fastnear.com/' },
        ],
      },
    ],
    archival: [
      {
        url: 'https://archival-rpc.testnet.near.org',
        name: 'NEAR Archival',
        logo: 'near.svg',
        header: null,
        isPreset: true,
        links: [
          { type: 'github', url: 'https://github.com/near' },
          { type: 'x', url: 'https://x.com/nearprotocol' },
          { type: 'website', url: 'https://near.org/' },
        ],
      },
    ],
  },
};

// const activeRpc = {
//   autoSwitch: null, // 'regular' or 'archive'
//   //or
//   url: 'https://rpc.testnet.near.org',
//   name: 'archival-rpc.testnet',
//   type: 'regular', //'archive'
//   logo: 'Near.svg', // DefaultRpcIcon
//   header: null,
//   // header:{
//   //   name: 'adasd',  'Content-Type'
//   //   value: 'asddsa','application/json;charset=utf-8'
//   // },
//   links: null,
//   isPreset: false,
// };
