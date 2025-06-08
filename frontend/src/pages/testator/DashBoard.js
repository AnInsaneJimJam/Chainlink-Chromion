"use client"

import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../../components/ui/dialog"
import { Shield, Plus, Edit, FileText, Users, Wallet } from "lucide-react"
import { Link } from "react-router-dom"
import { useWallet } from "../../hooks/useWallet"
import { useState, useEffect } from "react"
import { mockAssets } from "../../data/assets"

export default function TestatorDashboard() {
  const { isConnected, address, disconnect, formatAddress } = useWallet()
  const [isAssetDialogOpen, setIsAssetDialogOpen] = useState(false)
  const [isBeneficiaryDialogOpen, setIsBeneficiaryDialogOpen] = useState(false)
  const [willData, setWillData] = useState(null)
  const [hasWill, setHasWill] = useState(false)

  useEffect(() => {
    const savedWillData = localStorage.getItem("willData")
    if (savedWillData) {
      const parsedData = JSON.parse(savedWillData)
      setWillData(parsedData)
      setHasWill(true)
    }
  }, [])

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 flex items-center justify-center">
        <Card className="p-8 bg-white/80 backdrop-blur-sm text-center">
          <h2 className="text-xl font-semibold mb-4">Wallet Not Connected</h2>
          <p className="text-gray-600 mb-6">Please connect your wallet to access the testator dashboard</p>
          <Link to="/role-selection?role=testator">
            <Button className="bg-black text-white hover:bg-gray-800 rounded-full">Connect Wallet</Button>
          </Link>
        </Card>
      </div>
    )
  }

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
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">{formatAddress(address)}</span>
          <Button onClick={disconnect} variant="outline" className="rounded-full">
            Disconnect
          </Button>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Testator Dashboard</h1>
            <p className="text-gray-600 text-lg">
              Create and manage your digital will to secure your assets for your beneficiaries
            </p>
          </div>

          {/* Will Status */}
          {hasWill && willData ? (
            <Card className="p-8 bg-white/80 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <h2 className="text-2xl font-semibold">Your Digital Will</h2>
                    <Badge className="bg-green-100 text-green-800">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Active</span>
                      </div>
                    </Badge>
                  </div>
                  <div className="grid md:grid-cols-4 gap-6 text-sm">
                    <div>
                      <div className="text-gray-500">Created</div>
                      <div className="font-semibold">{willData.created}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Last Updated</div>
                      <div className="font-semibold">{willData.lastUpdated}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Beneficiaries</div>
                      <div className="font-semibold">{willData.beneficiaries.length}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Total Assets</div>
                      <div className="font-semibold">{willData.totalAssets}</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    onClick={() => (window.location.href = "/testator/edit-will")}
                    className="bg-black text-white hover:bg-gray-800 rounded-full flex items-center space-x-2"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit Will</span>
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-8 bg-white/80 backdrop-blur-sm text-center">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold">No Will Created Yet</h2>
                  <p className="text-gray-600">
                    Create your first digital will to secure your multi-chain assets for your beneficiaries
                  </p>
                </div>

                {/* Show available assets when no will exists */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Your Available Assets</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {mockAssets.map((asset) => (
                      <div key={asset.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${asset.color}`}></div>
                            <div className="text-sm font-semibold">{asset.type}</div>
                          </div>
                          <div className="text-xs text-gray-600">{asset.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">Total Portfolio: $22,000</div>
                </div>

                <Button
                  onClick={() => (window.location.href = "/testator/create-will")}
                  className="bg-black text-white hover:bg-gray-800 rounded-full flex items-center space-x-2 mx-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Will</span>
                </Button>
              </div>
            </Card>
          )}

          {/* Quick Actions - Only show if will exists */}
          {hasWill && willData && (
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">Manage Beneficiaries</h3>
                  <p className="text-gray-600">Add, remove, or update beneficiaries and their asset allocations</p>
                  <Button onClick={() => setIsBeneficiaryDialogOpen(true)} variant="outline" className="rounded-full">
                    Manage
                  </Button>
                </div>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">Asset Overview</h3>
                  <p className="text-gray-600">View all your digital assets and their current distribution</p>
                  <Button onClick={() => setIsAssetDialogOpen(true)} variant="outline" className="rounded-full">
                    View Assets
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </main>

      {/* Asset Overview Dialog */}
      <Dialog open={isAssetDialogOpen} onOpenChange={setIsAssetDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Your Multi-Chain Digital Assets</DialogTitle>
            <DialogDescription>Overview of all your digital assets across multiple blockchains</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockAssets.map((asset) => (
                <Card key={asset.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${asset.color}`}></div>
                      <h4 className="font-semibold">{asset.type}</h4>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div>{asset.amount}</div>
                    </div>
                    <Badge variant="outline">{asset.value}</Badge>
                  </div>
                </Card>
              ))}
            </div>
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Total Portfolio Value</span>
                <span className="text-xl font-bold">$22,000</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Beneficiary Management Dialog */}
      {hasWill && willData && (
        <Dialog open={isBeneficiaryDialogOpen} onOpenChange={setIsBeneficiaryDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Manage Beneficiaries</DialogTitle>
              <DialogDescription>Current beneficiaries and their asset allocations</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {willData.beneficiaries.map((beneficiary, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-semibold">{beneficiary.name}</h4>
                      <div className="text-sm text-gray-600">{beneficiary.address}</div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-blue-100 text-blue-800">{beneficiary.allocation}</Badge>
                    </div>
                  </div>
                </Card>
              ))}
              <div className="flex items-center justify-between pt-4 border-t">
                <span>Total Beneficiaries: {willData.beneficiaries.length}</span>
                <Button
                  onClick={() => (window.location.href = "/testator/edit-will")}
                  className="bg-black text-white hover:bg-gray-800 rounded-full"
                >
                  Edit Beneficiaries
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
