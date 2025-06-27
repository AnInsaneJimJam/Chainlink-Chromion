import {useState} from 'react'
import{useNavigate} from 'react-router-dom'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const Deploysmartwallet=()=>{
    const navigate = useNavigate()

   return(
    <div className="relative min-h-screen font-inter overflow-x-hidden" style={{fontFamily: 'Inter, sans-serif', backgroundColor: '#EAF6FF'}}>
        {/* Fixed Background */}
        <div className="fixed inset-0 w-full h-full overflow-hidden z-0">
            <div 
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(182.23% 114.29% at 93.19% 88.28%, #CDEFFF 0%, #FFF 47.28%, #CDEFFF 96.18%)'
                }}
            />
            <div 
                className="absolute w-[150vmax] h-[150vmax] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                style={{
                    transform: 'translate(-50%, -50%) rotate(-9.478deg)',
                    background: '#CDEFFF',
                    mixBlendMode: 'hue'
                }}
            />
            <div 
                className="absolute w-[150vmax] h-[150vmax] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                style={{
                    transform: 'translate(-50%, -50%) rotate(-30.74deg)',
                    background: 'url("https://i.pinimg.com/736x/ed/a1/9c/eda19c7ecf1dfd77f407ab1ed4dfecfa.jpg") lightgray 50% / cover no-repeat',
                    opacity: 0.25,
                    boxShadow: '0px 0px 114.717px 0px #CDEFFF'
                }}
            />
        </div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen">
            {/* Page Header */}
            <header className="absolute top-0 left-0 p-8 lg:p-12">
                <div className="flex items-center gap-4">
                    {/* Replace with your logo import */}
                    <img src="/path-to-your-logo.png" alt="InheritChain Logo" className="w-12 h-12" />
                    <span className="text-2xl font-semibold" style={{color: '#25292A', fontFamily: 'Clash Display', fontSize: '32px', fontWeight: 600}}>
                        InheritChain
                    </span>
                </div>
            </header>

            {/* Centered Content */}
            <div className="min-h-screen flex flex-col items-center justify-center pt-32 pb-12 px-4">
                <div className="text-center">
                    <h1 className="font-bold text-5xl lg:text-6xl mb-2" style={{color: '#0469AB', fontFamily: 'Clash Display', fontSize: '54px', fontWeight: 600}}>
                        Deploy Your Smart Contract Wallets
                    </h1>
                    <p className="text-xl lg:text-2xl" style={{color: '#767676', fontFamily: 'Inter', fontSize: '22px', fontWeight: 500}}>
                        Please ensure you're on the correct network when funding or withdrawing
                    </p>
                </div>

                {/* Warning Box */}
                <div className="mt-6 max-w-3xl w-full h-11 rounded-lg flex items-center justify-center px-4" style={{border: '0.5px solid #8F6112', background: '#FAF7C1'}}>
                    <p className="text-center font-medium" style={{color: '#AE791D', fontFamily: 'Inter', fontSize: 'clamp(16px, 2vw, 22px)', fontWeight: 500}}>
                        ⚠ Make sure your MetaMask network matches the selected chain
                    </p>
                </div>

                {/* Chain Cards */}
                <div className="space-y-6 mt-8 w-full max-w-7xl">
                    {/* Ethereum Chain */}
                    <div className="w-full max-w-5xl mx-auto min-h-44 rounded-lg p-6 flex items-center justify-between gap-4" 
                         style={{
                             border: '1.878px solid rgba(4, 105, 171, 0.50)',
                             background: 'rgba(167, 217, 255, 0.18)',
                             backdropFilter: 'blur(23.4779px)',
                             opacity: 0.8,
                             borderRadius: '9.391px'
                         }}>
                        <div className="flex-grow flex items-center gap-6">
                            <div className="w-16 h-16 flex-shrink-0">
                                {/* Replace with Ethereum logo */}
                                <img src="https://placehold.co/70x70/E6E6E6/000000?text=E" alt="Ethereum Logo" className="w-16 h-16" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold mb-2" style={{color: '#25292A', fontFamily: 'Inter', fontSize: '28px', fontWeight: 600}}>
                                    Ethereum
                                </h2>
                                <div className="flex items-center gap-2">
                                    <span style={{color: '#767676', fontFamily: 'Inter', fontSize: '20px', fontWeight: 600}}>Status:</span>
                                    <span className="px-2 py-1 rounded-xl text-sm font-semibold" style={{border: '1.203px solid #b45309', background: '#fef3c7', boxShadow: '2px 2px 4px 0px #92400e', color: '#b45309', borderRadius: '13.368px', fontSize: '16px', fontWeight: 600}}>
                                        ⊗ Not Deployed
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <button 
                                onClick={() => navigate('/Ethereumfundme')}
                                className="flex items-center justify-center gap-2 text-white font-semibold rounded-full transition-transform hover:scale-105"
                                style={{
                                    width: '203px',
                                    height: '50px',
                                    background: '#0167AF',
                                    boxShadow: '2px 2px 4px 0px #002844',
                                    borderRadius: '25.291px',
                                    fontFamily: 'Inter',
                                    fontSize: '20.3px',
                                    fontWeight: 600
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m9 18 6-6-6-6"/>
                                </svg>
                                Deploy Wallet
                            </button>
                        </div>
                    </div>

                    {/* Polygon Chain */}
                    <div className="w-full max-w-5xl mx-auto min-h-44 rounded-lg p-6 flex items-center justify-between gap-4" 
                         style={{
                             border: '1.878px solid rgba(4, 105, 171, 0.50)',
                             background: 'rgba(167, 217, 255, 0.18)',
                             backdropFilter: 'blur(23.4779px)',
                             opacity: 0.8,
                             borderRadius: '9.391px'
                         }}>
                        <div className="flex-grow flex items-center gap-6">
                            <div className="w-16 h-16 flex-shrink-0">
                                {/* Replace with Polygon logo */}
                                <img src="https://placehold.co/70x70/E6E6E6/000000?text=P" alt="Polygon Logo" className="w-16 h-16" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold mb-2" style={{color: '#25292A', fontFamily: 'Inter', fontSize: '28px', fontWeight: 600}}>
                                    Polygon
                                </h2>
                                <div className="flex items-center gap-2">
                                    <span style={{color: '#767676', fontFamily: 'Inter', fontSize: '20px', fontWeight: 600}}>Status:</span>
                                    <span className="px-2 py-1 rounded-xl text-sm font-semibold" style={{border: '1.203px solid #b45309', background: '#fef3c7', boxShadow: '2px 2px 4px 0px #92400e', color: '#b45309', borderRadius: '13.368px', fontSize: '16px', fontWeight: 600}}>
                                        ⊗ Not Deployed
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <button 
                                onClick={() => navigate('/Polygonfundme')}
                                className="flex items-center justify-center gap-2 text-white font-semibold rounded-full transition-transform hover:scale-105"
                                style={{
                                    width: '203px',
                                    height: '50px',
                                    background: '#0167AF',
                                    boxShadow: '2px 2px 4px 0px #002844',
                                    borderRadius: '25.291px',
                                    fontFamily: 'Inter',
                                    fontSize: '20.3px',
                                    fontWeight: 600
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m9 18 6-6-6-6"/>
                                </svg>
                                Deploy Wallet
                            </button>
                        </div>
                    </div>

                    {/* Base Chain */}
                    <div className="w-full max-w-5xl mx-auto min-h-44 rounded-lg p-6 flex items-center justify-between gap-4" 
                         style={{
                             border: '1.878px solid rgba(4, 105, 171, 0.50)',
                             background: 'rgba(167, 217, 255, 0.18)',
                             backdropFilter: 'blur(23.4779px)',
                             opacity: 0.8,
                             borderRadius: '9.391px'
                         }}>
                        <div className="flex-grow flex items-center gap-6">
                            <div className="w-16 h-16 flex-shrink-0">
                                {/* Replace with Base logo */}
                                <img src="https://placehold.co/70x70/E6E6E6/000000?text=B" alt="Base Logo" className="w-16 h-16" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold mb-2" style={{color: '#25292A', fontFamily: 'Inter', fontSize: '28px', fontWeight: 600}}>
                                    Base
                                </h2>
                                <div className="flex items-center gap-2">
                                    <span style={{color: '#767676', fontFamily: 'Inter', fontSize: '20px', fontWeight: 600}}>Status:</span>
                                    <span className="px-2 py-1 rounded-xl text-sm font-semibold" style={{border: '1.203px solid #b45309', background: '#fef3c7', boxShadow: '2px 2px 4px 0px #92400e', color: '#b45309', borderRadius: '13.368px', fontSize: '16px', fontWeight: 600}}>
                                        ⊗ Not Deployed
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <button 
                                onClick={() => navigate('/Basefundme')}
                                className="flex items-center justify-center gap-2 text-white font-semibold rounded-full transition-transform hover:scale-105"
                                style={{
                                    width: '203px',
                                    height: '50px',
                                    background: '#0167AF',
                                    boxShadow: '2px 2px 4px 0px #002844',
                                    borderRadius: '25.291px',
                                    fontFamily: 'Inter',
                                    fontSize: '20.3px',
                                    fontWeight: 600
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m9 18 6-6-6-6"/>
                                </svg>
                                Deploy Wallet
                            </button>
                        </div>
                    </div>

                    {/* Sepolia Chain */}
                    <div className="w-full max-w-5xl mx-auto min-h-44 rounded-lg p-6 flex items-center justify-between gap-4" 
                         style={{
                             border: '1.878px solid rgba(4, 105, 171, 0.50)',
                             background: 'rgba(167, 217, 255, 0.18)',
                             backdropFilter: 'blur(23.4779px)',
                             opacity: 0.8,
                             borderRadius: '9.391px'
                         }}>
                        <div className="flex-grow flex items-center gap-6">
                            <div className="w-16 h-16 flex-shrink-0">
                                {/* Replace with Sepolia logo */}
                                <img src="https://placehold.co/70x70/E6E6E6/000000?text=S" alt="Sepolia Logo" className="w-16 h-16" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold mb-2" style={{color: '#25292A', fontFamily: 'Inter', fontSize: '28px', fontWeight: 600}}>
                                    Sepolia
                                </h2>
                                <div className="flex items-center gap-2">
                                    <span style={{color: '#767676', fontFamily: 'Inter', fontSize: '20px', fontWeight: 600}}>Status:</span>
                                    <span className="px-2 py-1 rounded-xl text-sm font-semibold" style={{border: '1.203px solid #b45309', background: '#fef3c7', boxShadow: '2px 2px 4px 0px #92400e', color: '#b45309', borderRadius: '13.368px', fontSize: '16px', fontWeight: 600}}>
                                        ⊗ Not Deployed
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <button 
                                onClick={() => navigate('/Solanafundme')}
                                className="flex items-center justify-center gap-2 text-white font-semibold rounded-full transition-transform hover:scale-105"
                                style={{
                                    width: '203px',
                                    height: '50px',
                                    background: '#0167AF',
                                    boxShadow: '2px 2px 4px 0px #002844',
                                    borderRadius: '25.291px',
                                    fontFamily: 'Inter',
                                    fontSize: '20.3px',
                                    fontWeight: 600
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m9 18 6-6-6-6"/>
                                </svg>
                                Deploy Wallet
                            </button>
                        </div>
                    </div>

                    {/* Avalanche Chain */}
                    <div className="w-full max-w-5xl mx-auto min-h-44 rounded-lg p-6 flex items-center justify-between gap-4" 
                         style={{
                             border: '1.878px solid rgba(4, 105, 171, 0.50)',
                             background: 'rgba(167, 217, 255, 0.18)',
                             backdropFilter: 'blur(23.4779px)',
                             opacity: 0.8,
                             borderRadius: '9.391px'
                         }}>
                        <div className="flex-grow flex items-center gap-6">
                            <div className="w-16 h-16 flex-shrink-0">
                                {/* Replace with Avalanche logo */}
                                <img src="https://placehold.co/70x70/E6E6E6/000000?text=A" alt="Avalanche Logo" className="w-16 h-16" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold mb-2" style={{color: '#25292A', fontFamily: 'Inter', fontSize: '28px', fontWeight: 600}}>
                                    Avalanche
                                </h2>
                                <div className="flex items-center gap-2">
                                    <span style={{color: '#767676', fontFamily: 'Inter', fontSize: '20px', fontWeight: 600}}>Status:</span>
                                    <span className="px-2 py-1 rounded-xl text-sm font-semibold" style={{border: '1.203px solid #b45309', background: '#fef3c7', boxShadow: '2px 2px 4px 0px #92400e', color: '#b45309', borderRadius: '13.368px', fontSize: '16px', fontWeight: 600}}>
                                        ⊗ Not Deployed
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            <button 
                                onClick={() => navigate('/Avalanchefundme')}
                                className="flex items-center justify-center gap-2 text-white font-semibold rounded-full transition-transform hover:scale-105"
                                style={{
                                    width: '203px',
                                    height: '50px',
                                    background: '#0167AF',
                                    boxShadow: '2px 2px 4px 0px #002844',
                                    borderRadius: '25.291px',
                                    fontFamily: 'Inter',
                                    fontSize: '20.3px',
                                    fontWeight: 600
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m9 18 6-6-6-6"/>
                                </svg>
                                Deploy Wallet
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
   )
}
export default Deploysmartwallet