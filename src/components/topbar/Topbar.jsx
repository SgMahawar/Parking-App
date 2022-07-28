import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import "./topbar.css";

export default function TopBar(){

  const handleLogout = (e)=>{
    localStorage.removeItem("User");
    window.location="/login";
  }
  var user=localStorage.getItem("User");
  user=JSON.parse(user);
  return(
    <div className="top">
      <div className="topLeft">
        
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link to="/" className="link">HOME</Link>
          </li>
          {/* <li className="topListItem">
            <Link to="/" className="link">ABOUT</Link>
          </li> */}
          {/* <li className="topListItem">
            <Link to="/" className="link">CONTACT</Link>
          </li> */}
          <li className="topListItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {
          user ? 
          <Link className="userSettings" to="/settings">
            <img className="topImg" src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt=""/>
            <div>{user.firstName}</div>
          </Link>
           :
          (
            <ul className="topList">
              <li className="topListItemX">
                <Link to="/login" className="link">LOGIN</Link>
              </li>
              <li className="topListItemX">
                <Link to="/register" className="link">REGISTER</Link>
              </li>
            </ul>
          )
        }
      </div>
    </div>
  )
}