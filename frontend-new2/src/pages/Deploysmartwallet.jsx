import {useState} from 'react'
import{useNavigate} from 'react-router-dom'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"


const Deploysmartwallet=()=>{
    const navigate = useNavigate()

   return(
    <div className='deploy-container'>
            <h1>Ethereum chain</h1>
          <button  onClick={() => navigate('/Ethereumfundme')}>
                Deploy Wallet on Ethereum network/Fund Wallet on Ethereum Network
            </button>
          

            <h1>Polygon chain</h1>
            <button onClick={() => navigate('/Polygonfundme')}>
                Deploy Wallet on Polygon network/Fund Wallet on Polygon Network
            </button>
          
            <h1>Base chain</h1>
            <button onClick={() => navigate('/Basefundme')}>
                Deploy Wallet on Base network/Fund Wallet on Base Network
            </button>
          
            <h1>Sepolia chain</h1>
            <button onClick={() => navigate('/Solanafundme')}>
                Deploy Wallet on Seploia network/Fund Wallet on Sepolia Network
            </button>
        
            <h1>Avalanche chain</h1>
            <button onClick={() => navigate('/Avalanchefundme')}>
                Deploy Wallet on Avalanche network/Fund Wallet on Avalanche Network
            </button>
          
       
    </div>
 
   
   )
}
export default Deploysmartwallet