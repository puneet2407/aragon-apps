const { usePlugin } = require('@nomiclabs/buidler/config')

const { config } = require('dotenv')
const { resolve } =require('path')
config({ path: resolve(__dirname, '../../.env') })

usePlugin("@nomiclabs/buidler-ganache")
usePlugin('@nomiclabs/buidler-truffle5')
usePlugin('buidler-gas-reporter')
usePlugin('solidity-coverage')
usePlugin('@aragon/buidler-aragon')

const ACCOUNTS = (process.env.ETH_KEYS ? process.env.ETH_KEYS.split(',') : [])
  .map(key => key.trim())

module.exports = {
  networks: {
    // Local development network using ganache. You can set any of the
    // Ganache's options. All of them are supported, with the exception
    // of accounts.
    // https://github.com/trufflesuite/ganache-core#options
    ganache: {
      url: 'http://localhost:8545',
      gasLimit: 6000000000,
      defaultBalanceEther: 100
    },
    // Local development network to test coverage. Solidity coverage
    // pluging launches its own in-process ganache server.
    // and expose it at port 8555.
    coverage: {
      url: 'http://localhost:8555',
    },
    // Mainnet network configured with Aragon node.
    mainnet: {
      url: 'https://mainnet.eth.aragon.network',
      accounts: ACCOUNTS,
    },
    // Rinkeby network configured with Aragon node.
    rinkeby: {
      url: 'https://rinkeby.eth.aragon.network',
      accounts: ACCOUNTS,
    },
    // Network configured to interact with Frame wallet. Requires
    // to have Frame running on your machine. Download it from:
    // https://frame.sh
    frame: {
      httpHeaders: { origin: 'buidler' },
      url: 'http://localhost:1248',
    },
    mumbai: {
      url: 'https://polygon-mumbai.g.alchemy.com/v2/z3go4SKtSuiegUwtfkfd5tBCLDTcwYP_',
      accounts: ACCOUNTS,
    },
    matic: {
      url: 'https://polygon-mainnet.g.alchemy.com/v2/VUyk2zak-hvcH902FZoSrxBHB7CEN52w',
      accounts: ACCOUNTS,
    }
  },
  solc: {
    version: '0.4.24',
    optimizer: {
      enabled: true,
      runs: 1000,
    },
  },
  // The gas reporter plugin do not properly handle the buidlerevm
  // chain yet. In the mean time we should 'npx buidler node' and
  // then attach to running process using '--network localhost' as
  // explained in: https://buidler.dev/buidler-evm/#connecting-to-buidler-evm-from-wallets-and-other-software.
  // You can also run 'yarn devchain' and on a separate terminal run 'yarn test:gas'
  gasReporter: {
    enabled: process.env.REPORT_GAS ? true : false,
  },
}
