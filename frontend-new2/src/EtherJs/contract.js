import { ethers } from 'ethers'
import { CONTRACT_ADDRESS, CONTRACT_ABI, SEPOLIA_CHAIN_ID } from './constants'

export const connectWallet = async () => {
  if (!window.ethereum) {
    throw new Error('MetaMask not found. Please install MetaMask.')
  }

  try {
    // Request account access
    await window.ethereum.request({ method: 'eth_requestAccounts' })
    
    // Check if we're on Sepolia network
    const chainId = await window.ethereum.request({ method: 'eth_chainId' })
    if (chainId !== SEPOLIA_CHAIN_ID) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: SEPOLIA_CHAIN_ID }],
        })
      } catch (switchError) {
        console.error('Failed to switch to Sepolia network:', switchError)
        throw new Error('Please switch to Sepolia network manually')
      }
    }

    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
    const address = await signer.getAddress()
    
    return { provider, signer, address }
  } catch (error) {
    console.error('Error connecting wallet:', error)
    throw error
  }
}

export const getContract = (signer) => {
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
}

export const formatEther = (value) => {
  return ethers.formatEther(value)
}

export const parseEther = (value) => {
  return ethers.parseEther(value)
}