"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Shield, Plus, Trash2, Wallet } from "lucide-react"
import { useWallet } from "../../hooks/useWallet"
import { mockAssets } from "../../data/assets"

export default function CreateWill() {
  const navigate = useNavigate()
  const { isConnected, address, formatAddress } = useWallet()
  const [beneficiaries, setBeneficiaries] = useState([{ id: 1, address: "", name: "", allocations: {} }])
  const [isCreating, setIsCreating] = useState(false)

  const addBeneficiary = () => {
    setBeneficiaries([...beneficiaries, { id: Date.now(), address: "", name: "", allocations: {} }])
  }

  const removeBeneficiary = (id) => {
    setBeneficiaries(beneficiaries.filter((b) => b.id !== id))
  }

  const updateBeneficiary = (id, field, value) => {
    setBeneficiaries(beneficiaries.map((b) => (b.id === id ? { ...b, [field]: value } : b)))
  }

  const updateAllocation = (beneficiaryId, assetType, percentage) => {
    setBeneficiaries(
      beneficiaries.map((b) =>
        b.id === beneficiaryId ? { ...b, allocations: { ...b.allocations, [assetType]: percentage } } : b,
      ),
    )
  }

  const getTotalAllocation = (assetType) => {
    return beneficiaries.reduce((total, b) => total + (b.allocations[assetType] || 0), 0)
  }

  const handleCreateWill = async () => {
    setIsCreating(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const willData = {
      beneficiaries: beneficiaries.map((b) => ({
        name: b.name,
        address: b.address,
        allocation: "Equal",
        allocations: b.allocations,
      })),
      created: new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
      totalAssets: "$22,000",
      status: "active",
    }

    localStorage.setItem("willData", JSON.stringify(willData))
    setIsCreating(false)
    navigate("/testator/dashboard")
  }

  const isValidWill = () => {
    return (
      mockAssets.every((asset) => getTotalAllocation(asset.type) === 100) &&
      beneficiaries.every((b) => b.name && b.address)
    )
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 flex items-center justify-center">
        <Card className="p-8 bg-white/80 backdrop-blur-sm text-center">
          <h2 className="text-xl font-semibold mb-4">Wallet Not Connected</h2>
          <p className="text-gray-600 mb-6">Please connect your wallet to create a will</p>
          <Button
            onClick={() => navigate("/role-selection?role=testator")}
            className="bg-black text-white hover:bg-gray-800 rounded-full"
          >
            Connect Wallet
          </Button>
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
          <Link to="/testator/dashboard">
            <Button variant="outline" className="rounded-full">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Create Your Will</h1>
            <p className="text-gray-600 text-lg">
              Set up your digital inheritance by adding beneficiaries and distributing your assets across multiple
              blockchains
            </p>
          </div>

          {/* Assets Overview */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm">
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Wallet className="w-5 h-5" />
                <h2 className="text-xl font-semibold">Your Multi-Chain Assets</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {mockAssets.map((asset) => (
                  <div key={asset.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${asset.color}`}></div>
                        <div className="font-semibold">{asset.type}</div>
                      </div>
                      <div className="text-sm text-gray-600">
                        <div>{asset.amount}</div>
                        <div className="font-medium text-green-600">{asset.value}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Total Portfolio Value</span>
                  <span className="text-2xl font-bold">$22,000</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Beneficiaries */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Beneficiaries & Asset Distribution</h2>
                <Button
                  onClick={addBeneficiary}
                  className="bg-black text-white hover:bg-gray-800 rounded-full flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Beneficiary</span>
                </Button>
              </div>

              <div className="space-y-6">
                {beneficiaries.map((beneficiary, index) => (
                  <div key={beneficiary.id} className="p-6 border rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Beneficiary {index + 1}</h3>
                      {beneficiaries.length > 1 && (
                        <Button
                          onClick={() => removeBeneficiary(beneficiary.id)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`name-${beneficiary.id}`}>Name</Label>
                        <Input
                          id={`name-${beneficiary.id}`}
                          placeholder="Beneficiary name"
                          value={beneficiary.name}
                          onChange={(e) => updateBeneficiary(beneficiary.id, "name", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`address-${beneficiary.id}`}>Wallet Address</Label>
                        <Input
                          id={`address-${beneficiary.id}`}
                          placeholder="0x..."
                          value={beneficiary.address}
                          onChange={(e) => updateBeneficiary(beneficiary.id, "address", e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Asset Allocation */}
                    <div className="space-y-3">
                      <Label>Asset Allocation (%)</Label>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {mockAssets.map((asset) => (
                          <div key={asset.id} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${asset.color}`}></div>
                                <span className="text-sm font-medium">{asset.type}</span>
                              </div>
                              <span className="text-xs text-gray-500">Total: {getTotalAllocation(asset.type)}%</span>
                            </div>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              placeholder="0"
                              value={beneficiary.allocations[asset.type] || ""}
                              onChange={(e) =>
                                updateAllocation(beneficiary.id, asset.type, Number.parseInt(e.target.value) || 0)
                              }
                              className={getTotalAllocation(asset.type) > 100 ? "border-red-500" : ""}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Allocation Summary */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Allocation Summary</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {mockAssets.map((asset) => {
                  const total = getTotalAllocation(asset.type)
                  const isValid = total === 100
                  return (
                    <div
                      key={asset.id}
                      className={`p-4 rounded-lg ${isValid ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${asset.color}`}></div>
                          <div className="font-semibold">{asset.type}</div>
                        </div>
                        <div className={`text-sm ${isValid ? "text-green-600" : "text-red-600"}`}>
                          {total}% allocated {isValid ? "✓" : "⚠️"}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <Button onClick={() => navigate("/testator/dashboard")} variant="outline" className="rounded-full">
              Cancel
            </Button>
            <Button
              onClick={handleCreateWill}
              disabled={!isValidWill() || isCreating}
              className="bg-black text-white hover:bg-gray-800 rounded-full px-8"
            >
              {isCreating ? "Creating Will..." : "Create Will"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
