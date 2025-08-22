import { http, cookieStorage, createConfig, createStorage } from 'wagmi'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

// 🔹 Red Shibuya Testnet
const shibuya = {
  id: 81,
  name: 'Shibuya Testnet',
  network: 'shibuya',
  nativeCurrency: {
    decimals: 18,
    name: 'Shibuya Token',
    symbol: 'SBY',
  },
  rpcUrls: {
    default: {
      http: ['https://evm.shibuya.astar.network'],
      webSocket: ['wss://rpc.shibuya.astar.network'], // 🔹 opcional pero recomendado
    },
    public: {
      http: ['https://evm.shibuya.astar.network'],
      webSocket: ['wss://rpc.shibuya.astar.network'],
    },
  },
  blockExplorers: {
    default: { name: 'Blockscout', url: 'https://blockscout.com/shibuya' },
  },
  testnet: true,
} as const

export function getConfig() {
  return createConfig({
    chains: [shibuya],
    connectors: [
      injected(),
      coinbaseWallet({
        appName: 'MiDapp',
      }),
      walletConnect({ projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID || '' }),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [shibuya.id]: http('https://evm.shibuya.astar.network'),
    },
  })
}

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>
  }
}
