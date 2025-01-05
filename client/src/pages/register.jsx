/*import { useState } from "react";
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
*/
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "./firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import "../styling/register.css"; // Dedicated CSS file for Register styling

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCred.user;
      await updateProfile(user, {
        displayName: name,
      });
      alert("Registration successful");
      navigate("/home");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await updateProfile(user, { displayName: user.displayName });
      alert("Successfully registered with Google account");
      navigate("/home");
    } catch (error) {
      console.error("Google registration error:", error);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form">
        <h2>Create an Account</h2>
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
        <button type="submit" className="register-btn">
          Register
        </button>
      </form>
      <button onClick={handleGoogleRegister} className="google-register-btn">
        Register with Google
      </button>
    </div>
  );
};

export default Register;
