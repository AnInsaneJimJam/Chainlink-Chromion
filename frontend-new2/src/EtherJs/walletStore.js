// store/walletStore.js
import { create } from 'zustand'

const useWalletStore = create((set, get) => ({
  // Wallet state
  contract: null,
  
  // Actions
  setContract: (contract) => {
    set({
      contract,
    })
  },
}))

export default useWalletStore