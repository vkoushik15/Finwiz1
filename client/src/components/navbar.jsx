import { useEffect,useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import { auth } from "../pages/firebase";
import {signOut,onAuthStateChanged} from 'firebase/auth'
import '../styling/navbar.css'
const Navbar =()=>{
const[user,setUser]=useState(null)
const navigate = useNavigate()
useEffect(()=>{
    const unsub = onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser)
    })
    return()=>unsub()
},[])
const handlelogout =async()=>{
    try {
        await signOut(auth)
        alert('you have been logged out')
        navigate('/login')
    } catch (error) {
        console.log('error during logout')
    }
}
return(
    <>
    <nav className="navbar">
        <div className="navlogo">
            <img
            src="logo.png"
            alt="logo"
            className="logo"
            />
        </div>

        <div className="navlinks">
            <NavLink to='/home'>Home</NavLink>
            <NavLink to = '/about'>About</NavLink>
            {!user?(
                <>
                <NavLink to ='/login'>Login</NavLink>
                <NavLink to ='/register'>REgister</NavLink>
                </>
            ):(
                <button onClick={handlelogout}>Logout</button>
            )}
        </div>
    </nav>
    
    </>
)
}
export default Navbar