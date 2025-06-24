// Simple wallet connect and disconnect functions

const getChainName = (chainId) => {
  const chains = {
    '0x1': 'Ethereum Mainnet',
    '0x89': 'Polygon Mainnet',
    '0x38': 'BSC Mainnet',
    '0xaa36a7': 'Sepolia Testnet',
    '0x13881': 'Polygon Mumbai',
    '0x61': 'BSC Testnet',
    '0xa4b1': 'Arbitrum One',
    '0xa': 'Optimism',
    '0x2105': 'Base',
    '0x144': 'zkSync Era Mainnet'
  }
  return chains[chainId] || `Unknown Chain (${chainId})`
}

const connectWallet = async () => {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed')
  }

  try {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    })

    const chainId = await window.ethereum.request({
      method: 'eth_chainId'
    })

    console.log(accounts[0]);
    return {
      account: accounts[0],
      chainName: getChainName(chainId)
    }
  } catch (error) {
    if (error.code === 4001) {
      throw new Error('Connection rejected by user')
    }
    throw new Error('Failed to connect to wallet')
  }
}

const disconnectWallet = async () => {
  return {
    account: null,
    chainName: null
  }
}

export { connectWallet, disconnectWallet }