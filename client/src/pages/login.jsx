import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth ,googleProvider} from "./firebase";
import {signInWithEmailAndPassword,signInWithPopup} from 'firebase/auth'

const Login=()=>{
  const[formdata,setFormdata]=useState({email:"",password:''})
  const navigate =useNavigate()
  const handlechange=(e)=>{
    const {name,value} = e.target
    setFormdata({...formdata,[name]:value})
  }  
  const handlesubmit=async(e)=>{
    e.preventDefault()
    try {
        const {email,password} = formdata
        await signInWithEmailAndPassword(auth,email,password)
        alert('login sucessful')
        navigate('/home')

    } catch (error) {
        console.log('error during login',error)
        alert(error.message)
    }
  }
  const googlogin =async()=>{
    try {
        await signInWithPopup(auth,googleProvider)
        navigate('/home')
    } catch (error) {
       console.log('google login eror',error) 
    }
  }
return(
    <>
    <form onSubmit={handlesubmit}>

        <input
        type="email"
        name="email"
        placeholder="email"
        
        onChange={handlechange} 
        required          
        />
        <input
        type="password"
        name="password"
        placeholder="password"
        
        onChange={handlechange}
        required
        />
        <button>login</button>
    </form>
    <button onClick={googlogin}>Login using google</button>
    </>
)

}
export default Login