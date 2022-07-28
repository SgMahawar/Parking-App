import axios from 'axios';
import React from 'react'
import "./space.css"

export default function Space({prop}) {
  const array=prop.bookings;
  const id=prop.id;
  const remove= async ()=>{
    const res=await axios.delete("http://localhost:8080/space/"+id);
    window.location.reload(true);
  }
  return (
    <div className="space">
      <div className="spaceHeader">
        <p className="s_no">Space Number: {prop.spaceNumber}</p>
        <button onClick={remove}>Remove</button>
      </div>
      <p className="s_no">Booked Slots</p>
      <div className="slotsList">
        {
          array.map(element=>(
            <p className="slots">{element}</p>
          ))
        }
      </div>
    </div>
  )
}
