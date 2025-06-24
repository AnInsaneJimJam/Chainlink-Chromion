import {useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { Card } from "@/components/ui/card"

const Withdraw=()=>{
   const navigate = useNavigate();
   const [amounttowithdraw,setamounttowithdraw]=useState('')
   const [addresstosend,setaddresstosend]=useState('')
   const [amounttosend,setamounttosend]=useState('')
   const[data,setdata]=useState('')
   const[erroroftransfer,seterroroftransfer]=useState('')
   const [errorofwithdraw,seterrorofwithdraw]=useState('')
   const handleSubmitofwithdraw=async(e)=>{
        e.preventDefault()
        if(responsewithdraw.ok){//confirmation got amount in backend
            setamounttowithdraw('')
        }
        else{
            seterrorofwithdraw(json.errorofwithdraw)
            console.log("Fetch Error",errorofwithdraw)
        }
    }
   const handlesubmitoftransfer=async(e)=>{
         e.preventDefault()
         if(responsetransfer.ok){
            setaddresstosend('')
            setamounttosend('')
            setdata('')
         }
         else{
            seterroroftransfer(json.error)
            console.log("Fetch error",erroroftransfer)
         }

    }

    return(
        <div className='withdraw-transfer-container'>
            <button
                        onClick={()=>navigate('/dashboard')}
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        Back to Dashboard
                      </button>

       <h1>TRANSFER FORM</h1>
            <form className="transfer-form" onSubmit={handlesubmitoftransfer}>
                <label>Transfer address to</label>
                <input type='text' onChange={(e)=>{
                    setaddresstosend(e.target.value)
                }} value={addresstosend}/>
                <label> Transfer amount</label>
                <input type='text' onChange={(e)=>{
                    setamounttosend(e.target.value)
                }} value={amounttosend}/>
                <label>Calldata bytes</label>
                 <input type='text' onChange={(e)=>{
                    setdata(e.target.value)
                }} value={data}/>
                <button>TRANSFER</button>
            </form>
       


      <h1>WITHDRAW FORM</h1>
            <form className="withdraw-form"  onSubmit={handleSubmitofwithdraw}>
            <label>EnterAmount</label>
            <input type="text" 
            onChange={(e)=>{
                setamounttowithdraw(e.target.value)
            }} value={amounttowithdraw}/>
            <button>WITHDRAW</button>
        </form>  
        
       </div>
        )
    }
export default Withdraw