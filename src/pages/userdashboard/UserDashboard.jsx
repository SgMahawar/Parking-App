import "./userdashboard.css";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Space from "../../components/space/Space";
import BookingPopup from "../../components/booking/Booking";

export default function UserDashboard(){
  const [showAvailable, setShowAvailable]= useState(false);
  const [dateRef, setDateRef] = useState("");
  const [slotRef,setSlotRef]=useState("");
  const [spaces, setSpaces]=useState([]);
  const [popup, setPopup] = useState(false);
  const [spaceProp, setSpaceProp]=useState("");

  const checkAvailable=async(e)=>{
    e.preventDefault();
    const res=await axios.get("http://localhost:8080/space/"+dateRef+"@"+slotRef);
    setShowAvailable(true);
    localStorage.setItem("slot",dateRef+"@"+slotRef);
    setSpaces(res.data);
  }

  const startBooking=async()=>{
    const ls=localStorage.getItem("space");
    // console.log(JSON.parse(ls));
    await setSpaceProp(ls);
    console.log(spaceProp);
    setPopup(true);
    window.location="/booking";
  }

  return(
    <div className="userdashboard">
      <div className="queryFormDiv">
        <h2>Check Available Spaces...</h2>
        <form className="queryForm">
          <label>Date</label>
          <input type="date" onChange={e=>setDateRef(e.target.value)}></input>
          <label>Slot</label>
          <select onChange={e=>setSlotRef(e.target.value)}>
            <option value="12am-1am">12am-1am</option>
            <option value="1am-2am">1am-2am</option>
            <option value="2am-3am">2am-3am</option>
            <option value="3am-4am">3am-4am</option>
            <option value="4am-5am">4am-5am</option>
            <option value="5am-6am">5am-6am</option>
            <option value="6am-7am">6am-7am</option>
            <option value="7am-8am">7am-8am</option>
            <option value="8am-9am">8am-9am</option>
            <option value="9am-10am">9am-10am</option>
            <option value="10am-11am">10am-11am</option>
            <option value="11am-12pm">11am-12pm</option>
            <option value="12pm-1pm">12pm-1pm</option>
            <option value="1pm-2pm">1pm-2pm</option>
            <option value="2pm-3pm">2pm-3pm</option>
            <option value="3pm-4pm">3pm-4pm</option>
            <option value="4pm-5pm">4pm-5pm</option>
            <option value="5pm-6pm">5pm-6pm</option>
            <option value="6pm-7pm">6pm-7pm</option>
            <option value="7pm-8pm">7pm-8pm</option>
            <option value="8pm-9pm">8pm-9pm</option>
            <option value="9pm-10pm">9pm-10pm</option>
            <option value="10pm-11pm">10pm-11pm</option>
            <option value="11am-12am">11am-12am</option>
          </select>
          <button onClick={checkAvailable}>Check</button>
        </form>
      </div>
      <div className="spacesListBlock">
          <div className="spacesHeader">
            <h2>Available Spaces</h2>
          </div>
          <div className="spacesListUser">
          {
            spaces.map(element=>(
              <button className="availSpaces" onClick={()=>{localStorage.setItem("space",JSON.stringify(element));startBooking()}}>Space No. {element.spaceNumber}</button>
            ))
          }
          </div>
        </div>
      
    </div>
  )
}