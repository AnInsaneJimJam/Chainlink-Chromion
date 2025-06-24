import {useNavigate} from 'react-router-dom'
import { useState } from 'react'

const Ethereumfundme=()=>{
    const navigate = useNavigate();
   const [amount,setamount]=useState('')
   const [error,seterror]=useState('')
  const  handleSubmit=async (e) =>{
        e.preventDefault()
        if(response.ok){//confirmation got amount in backend
            setamount('')
           
        }
        else{
            seterror(json.error)
            console.log("Fetch Error",error)
        }
    }
    return(
        
   <div>
              <button
                        onClick={()=>navigate('/dashboard')}
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        Back to Dashboard
                      </button>

      <div>
        <h1> Transfer Ethereum funds</h1>
        <form className="shared-form"  onSubmit={handleSubmit}>
            <label>EnterAmount</label>
            <input type="text" 
            onChange={(e)=>{
                setamount(e.target.value)
            }} value={amount}/>
            <button type="submit">Submit</button>
        </form>
        </div>
        </div>
    )
}
export default Ethereumfundme