"use client"

import { useState, useEffect } from "react"

export function useWallet() {
  const [wallet, setWallet] = useState({
    isConnected: false,
    address: null,
    isConnecting: false,
  })

  useEffect(() => {
    // Check if wallet was previously connected
    const savedAddress = localStorage.getItem("walletAddress")
    if (savedAddress) {
      setWallet({
        isConnected: true,
        address: savedAddress,
        isConnecting: false,
      })
    }
  }, [])

  const connect = async () => {
    setWallet((prev) => ({ ...prev, isConnecting: true }))

    // Simulate wallet connection
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const mockAddress = "0x1234567890123456789012345678901234567890"
    localStorage.setItem("walletAddress", mockAddress)

    setWallet({
      isConnected: true,
      address: mockAddress,
      isConnecting: false,
    })
  }

  const disconnect = () => {
    localStorage.removeItem("walletAddress")
    setWallet({
      isConnected: false,
      address: null,
      isConnecting: false,
    })
  }

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return {
    ...wallet,
    connect,
    disconnect,
    formatAddress,
  }
}
