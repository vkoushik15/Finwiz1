import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import { auth,googleProvider } from "./firebase";
import {createUserWithEmailAndPassword,updateProfile,signInWithPopup} from 'firebase/auth'

const Register =()=>{
const[name,setName]=useState('')
const[email,setEmail]=useState('')
const[password,setPassword] = useState('')
const navigate =useNavigate()
const Handleregister=async(e)=>{
    e.preventDefault()
    try {
        const usercred = await createUserWithEmailAndPassword(auth,email,password)
        const user = usercred.user
        await updateProfile(user,{
            displayName:name
        })
        console.log('user regisered sucessfully',user)
        alert('registered succesffuly')
        navigate('/home')

    } catch (error) {
        console.log('error during registration',error)
    }
}
const handlegoog=async()=>{
    try {
        const result = await signInWithPopup(auth,googleProvider)
        const user = result.user 
        await updateProfile(user,{displayName:user.displayName})
        alert('sucesfully registerd with google account')
        navigate('/home')
    } catch (error) {
        console.log('error from goog reg is',error)
    }
}


    return(
        <>
        <form onSubmit={Handleregister}>
        <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Register</button>
        </form>
        <button onClick={handlegoog}>register with google</button>
        
        </>
    )
}
export default Register