"use client"

import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../components/ui/dialog"
import { Shield, Plus, Trash2, Wallet, Save } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useWallet } from "../../hooks/useWallet"
import { mockAssets } from "../../data/assets"

export default function EditWill() {
  const { isConnected, address, disconnect, formatAddress } = useWallet()
  const navigate = useNavigate()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [beneficiaries, setBeneficiaries] = useState([])
  const [originalBeneficiaries, setOriginalBeneficiaries] = useState([])
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    const savedWillData = localStorage.getItem("willData")
    if (savedWillData) {
      const parsedData = JSON.parse(savedWillData)
      const loadedBeneficiaries = parsedData.beneficiaries.map((beneficiary, index) => ({
        id: index + 1,
        name: beneficiary.name,
        address: beneficiary.address,
        allocations: beneficiary.allocations || {},
      }))
      setBeneficiaries(loadedBeneficiaries)
      setOriginalBeneficiaries(loadedBeneficiaries)
    } else {
      navigate("/testator/dashboard")
    }
  }, [navigate])

  useEffect(() => {
    const currentData = JSON.stringify(beneficiaries)
    const originalData = JSON.stringify(originalBeneficiaries)
    setHasChanges(currentData !== originalData)
  }, [beneficiaries, originalBeneficiaries])

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

  const handleSaveChanges = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const willData = {
      beneficiaries: beneficiaries.map((b) => ({
        name: b.name,
        address: b.address,
        allocation: "Updated",
        allocations: b.allocations,
      })),
      created: JSON.parse(localStorage.getItem("willData") || "{}").created || new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
      totalAssets: "$22,000",
      status: "active",
    }

    localStorage.setItem("willData", JSON.stringify(willData))
    setIsSaving(false)
    navigate("/testator/dashboard")
  }

  const handleDeleteWill = async () => {
    setIsDeleting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    localStorage.removeItem("willData")
    setIsDeleting(false)
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
          <p className="text-gray-600 mb-6">Please connect your wallet to edit your will</p>
          <Button
            onClick={() => (window.location.href = "/role-selection?role=testator")}
            className="bg-black text-white hover:bg-gray-800 rounded-full"
          >
            Connect Wallet
          </Button>
        </Card>
      </div>
    )
  }

  if (beneficiaries.length === 0 && !hasChanges) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 flex items-center justify-center">
        <Card className="p-8 bg-white/80 backdrop-blur-sm text-center">
          <h2 className="text-xl font-semibold mb-4">Loading Will Data...</h2>
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
            <h1 className="text-4xl font-bold">Edit Your Will</h1>
            <p className="text-gray-600 text-lg">
              Update your digital inheritance by modifying beneficiaries and asset distributions across multiple
              blockchains
            </p>
            {hasChanges && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-yellow-800 text-sm">You have unsaved changes</p>
              </div>
            )}
          </div>

          {/* Will Info */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Will Information</h2>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Created:</span>{" "}
                  {JSON.parse(localStorage.getItem("willData") || "{}").created || "N/A"}
                </div>
                <div>
                  <span className="text-gray-500">Last Updated:</span>{" "}
                  {JSON.parse(localStorage.getItem("willData") || "{}").lastUpdated || "N/A"}
                </div>
                <div>
                  <span className="text-gray-500">Status:</span> Active
                </div>
              </div>
            </div>
          </Card>

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
            <Button
              onClick={() => navigate("/testator/dashboard")}
              variant="outline"
              className="rounded-full"
            >
              Cancel Changes
            </Button>
            <div className="flex items-center space-x-3">
              <Button
                onClick={() => setIsDeleteDialogOpen(true)}
                variant="outline"
                className="rounded-full text-red-600 border-red-600 hover:bg-red-50"
              >
                Delete Will
              </Button>
              <Button
                onClick={handleSaveChanges}
                disabled={!isValidWill() || isSaving}
                className="bg-black text-white hover:bg-gray-800 rounded-full px-8 flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? "Saving..." : "Save Changes"}</span>
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Will</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your will? This action cannot be undone and all beneficiaries will lose
              access to their inheritance across all blockchains.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={isDeleting}>
              Cancel
            </Button>
            <Button onClick={handleDeleteWill} disabled={isDeleting} className="bg-red-600 text-white hover:bg-red-700">
              {isDeleting ? "Deleting..." : "Delete Will"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
