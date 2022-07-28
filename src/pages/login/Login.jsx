import "./login.css";
import { useContext, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Navigate } from "react-router";
import { GoogleLogin, GoogleLogout } from 'react-google-login';

export default function Login(){

  const userRef = useRef();
  const passwordRef = useRef();
  const [isFetching, setIsFetching] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const handleSubmit = async(event)=>{
    console.log('Submitted');
    event.preventDefault();
    try{
      setIsFetching(true);
      const res = await axios.post("http://localhost:8080/user/login",{
        username: userRef.current.value,
        password: passwordRef.current.value
      });
      setIsFetching(false);
      console.log(res.data.username);
      if(res.data.username==='null') setLoginError(true);
      else {
        localStorage.setItem("User",JSON.stringify(res.data));
        if(res.data.username==="admin") window.location="/admindashboard";
        else window.location="/dashboard";
      }
    } catch{
      
      console.log("There is an error!");
    }
  }
  
  const user = localStorage.getItem("User");

  const onGoogleLogin = (res) => {
    console.log('Login Success:', res.profileObj);
    localStorage.setItem("User",JSON.stringify(res.data));
    window.location="/dashboard";
  };

  const onGoogleLogout = () => {
    alert("You have been logged out successfully");
    console.clear();
    // setShowloginButton(true);
    // setShowlogoutButton(false);
};

  const onGoogleFailure = (res) => {
      console.log('Login Failed:', res);
  };

  return(
    <div className="login">
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input 
        className="loginInput" 
        type="text" 
        placeholder="Enter your username..." 
        ref={userRef}
        />
        <label>Password</label>
        <input 
        className="loginInput" 
        type="password" 
        placeholder="Enter your password..." 
        ref={passwordRef}
        />
        {loginError && <p className="loginWarning">*Wrong credentials!</p>}
        <button className="loginButton" type="submit" >
          Login
        </button>
         <GoogleLogin
          clientId="g-client"
          className="g.signin"
          buttonText="Sign In"
          onSuccess={onGoogleLogin}
          onFailure={onGoogleFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        ></GoogleLogin>
        <GoogleLogout
                    clientId="rajma"
                    buttonText="Sign Out"
                    onLogoutSuccess={onGoogleLogout}
                ></GoogleLogout>
      </form>
      {/* <button className="loginRegisterButton">
        <Link className="link" to="/register">Register</Link>
      </button> */}
    </div>
  )
}
