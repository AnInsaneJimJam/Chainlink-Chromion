"use client"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { ArrowRight, Shield, Users, FileText } from "lucide-react"

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-semibold">InheritChain</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => navigate("/role-selection?role=testator")}
            className="bg-black text-white hover:bg-gray-800 rounded-full px-6"
          >
            Connect Wallet
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-12">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
              Digital
              <br />
              inheritance with
              <br />
              <span className="font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                blockchain
              </span>
            </h1>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">
              Secure your digital assets for your loved ones. Create tamper-proof wills and ensure seamless asset
              transfer when it matters most.
            </p>
          </div>

          {/* Stats */}
          <div className="flex justify-center items-center space-x-12 py-8">
            <div>
              <div className="text-3xl font-bold">100%</div>
              <div className="text-sm text-gray-500">Secure</div>
            </div>
            <div>
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-sm text-gray-500">Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold">0</div>
              <div className="text-sm text-gray-500">Intermediaries</div>
            </div>
          </div>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto pt-12">
            <Card
              className="p-8 hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-blue-200 bg-white/80 backdrop-blur-sm"
              onClick={() => navigate("/role-selection?role=testator")}
            >
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold">I'm a Testator</h3>
                <p className="text-gray-600">
                  Create and manage your digital will. Distribute your assets to beneficiaries according to your wishes.
                </p>
                <div className="flex items-center justify-center text-blue-600 font-semibold">
                  Create Will <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Card>

            <Card
              className="p-8 hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-purple-200 bg-white/80 backdrop-blur-sm"
              onClick={() => navigate("/role-selection?role=beneficiary")}
            >
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold">I'm a Beneficiary</h3>
                <p className="text-gray-600">
                  View wills where you're named as a beneficiary. Track status and initiate inheritance processes.
                </p>
                <div className="flex items-center justify-center text-purple-600 font-semibold">
                  View Inheritances <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20">
          <div className="text-center space-y-12">
            <h2 className="text-4xl font-bold">Why Choose InheritChain?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Secure & Immutable</h3>
                <p className="text-gray-600">
                  Your will is stored on blockchain, making it tamper-proof and permanently accessible.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Easy Management</h3>
                <p className="text-gray-600">
                  Simple interface to create, edit, and manage your digital inheritance plans.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Automated Transfer</h3>
                <p className="text-gray-600">
                  Assets are automatically transferred to beneficiaries when conditions are met.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
