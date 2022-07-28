import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";

export default function Register() {

  const [username, setUsername ] = useState("");
  const [password, setPassword ] = useState("");
  const [confPass, setConfPass] = useState("");
  const [email, setEmail ] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError ] = useState(false);
  const [working, setWorking] = useState(false);
  const [notMatching, setNotMatching] = useState(false);
  const [empty,setEmpty] = useState(false);
  const [usernameNA, setUsernameNA] = useState(false);
  const bookings = [];
  const extraServices = [];
  const cost = [];

  const handleSubmit = async (e)=>{
    setError(false);
    if(username===""||firstName===""||email===""||password===""||mobileNumber===""||vehicleNumber==="") setEmpty(true);
    setWorking(true);
    if(confPass!==password) setNotMatching(true);
    e.preventDefault();
    console.log(empty);
    console.log(notMatching);
    if(empty||notMatching) {
      setEmpty(false);
      setNotMatching(false);
      return 0;
    }
    else{
      try{
        setUsernameNA(false);
        const res = await axios.post("http://localhost:8080/user/register",{
          firstName,
          lastName,
          username,
          email,
          password,
          address,
          mobileNumber,
          vehicleNumber,
          bookings,
          extraServices,
          cost
        });
        if(res.data.username==="na") setUsernameNA(true);
        else if(confPass!==password) console.log("na");
        else window.location.replace("/login");
        console.log(usernameNA);
      }
      catch(err){
        setError(true);
        console.log(err);
      } 
    }
    
  }

  return (
    <div className="register">
      <form className="registerForm"
      onSubmit={handleSubmit}
      >
        <div className="row">
            <label>First Name</label>
            <input className="registerInput" type="text" placeholder="Enter your first name..." 
            onChange={e=>setFirstName(e.target.value)}
            />
            <label>Last Name</label>
            <input className="registerInput col" type="text" placeholder="Enter your last name..." 
            onChange={e=>setLastName(e.target.value)}
            />
        </div>
        <div className="row">
          <label>Username</label>
          <input className="registerInput" type="text" placeholder="Enter your username..." 
          onChange={e=>setUsername(e.target.value)}
          />
          <label>Email</label>
          <input className="registerInput" type="email" placeholder="Enter your email..." 
          onChange={e=>setEmail(e.target.value)}
          />
        </div>
        <div className="row">
          <label>Password</label>
          <input className="registerInput" type="password" placeholder="Create new password..." 
          onChange={e=>setPassword(e.target.value)}
          />
          <label>Confirm Password</label>
          <input className="registerInput" type="password" placeholder="Confirm password..." 
          onChange={e=>setConfPass(e.target.value)}
          />
        </div>
        {notMatching && <p className="err">* Password not matching!</p>}
        <label>Residential Address</label>
        <input className="registerInput" type="text" placeholder="Enter your residential address..." 
        onChange={e=>setAddress(e.target.value)}
        />
        <label>Mobile Number</label>
        <input className="registerInput" type="number" placeholder="Enter your mobile number..." 
        onChange={e=>setMobileNumber(e.target.value)}
        />
        <label>Car registration Number</label>
        <input className="registerInput" type="text" placeholder="Enter your car registration number..." 
        onChange={e=>setVehicleNumber(e.target.value)}
        />
        {error && <p className="err">* Username/Email already in use!</p>}
        {empty && <p className="err">* All fields are mandatory!</p>}
        {usernameNA && <p className="err">* Username not available!</p>}
        <button className="registerButton" type="submit" >Register
        {working ? <i class="fa fa-spinner fa-spin"></i>: ``}
        </button>
      </form>
      {/* <button className="registerLoginButton">
        <Link to="/login" className="link">Login</Link>
      </button> */}
    </div>
  )
}
