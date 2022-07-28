import Login from "./pages/login/Login";
import UserDashboard from "./pages/userdashboard/UserDashboard";
import './App.css';
import { ReactDOM } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Register from "./pages/register/Register";
import TopBar from "./components/topbar/Topbar";
import AdminDashboard from "./pages/admindashboard/AdminDashboard";
import Booking from "./components/booking/Booking";
// import { Link } from 'react-router-dom';

function App() {
  const user=JSON.parse(localStorage.getItem("User"));
  // console.log(user.username);
  return (
    <Router>
    <TopBar />
      <Routes>
        <Route exact path="/" element={
          (user ? (user.username==="admin" ? <AdminDashboard /> : <UserDashboard />): <Login />)
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
    </Router>
    
    
  );
}

export default App;
