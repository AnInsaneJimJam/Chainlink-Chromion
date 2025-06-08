"use client"

import React from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Shield, Wallet } from "lucide-react"
import { useWallet } from "../hooks/useWallet"
import { useEffect } from "react"

export default function RoleSelection() {
  const location = useLocation()
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search)
  const role = searchParams.get("role")
  const { isConnected, isConnecting, connect } = useWallet()

  useEffect(() => {
    if (isConnected) {
      if (role === "testator") {
        navigate("/testator/dashboard")
      } else {
        navigate("/beneficiary/dashboard")
      }
    }
  }, [isConnected, role, navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-semibold">InheritChain</span>
        </Link>
      </nav>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-md mx-auto">
          <Card className="p-8 bg-white/80 backdrop-blur-sm">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                <Wallet className="w-8 h-8 text-white" />
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl font-bold">Connect Your Wallet</h1>
                <p className="text-gray-600">
                  {role === "testator"
                    ? "Connect your wallet to create and manage your digital will"
                    : "Connect your wallet to view inheritances where you are a beneficiary"}
                </p>
              </div>

              <Button
                onClick={connect}
                disabled={isConnecting}
                className="w-full bg-black text-white hover:bg-gray-800 rounded-full py-3"
              >
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </Button>

              <p className="text-xs text-gray-500">We support MetaMask, WalletConnect, and other Web3 wallets</p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
