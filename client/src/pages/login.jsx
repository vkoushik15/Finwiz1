/*import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth ,googleProvider} from "./firebase";
import {signInWithEmailAndPassword,signInWithPopup} from 'firebase/auth'
import '../styling/login.css'

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
*/
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "./firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import "../styling/login.css"; // Include a dedicated CSS file for styling

const Login = () => {
  const [formdata, setFormdata] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formdata;
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful");
      navigate("/home");
    } catch (error) {
      console.log("Error during login:", error);
      alert(error.message);
    }
  };

  const googleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/home");
    } catch (error) {
      console.log("Google login error:", error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formdata.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formdata.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="login-btn">Login</button>
      </form>
      <button onClick={googleLogin} className="google-login-btn">
        Login using Google
      </button>
    </div>
  );
};

export default Login;
