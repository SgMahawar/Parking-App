import React from 'react'
import './worker.css'
import axios from 'axios';

export default function Worker({worker}) {
  const removeWorker = async ()=>{
    const id=worker.id;
    const res = await axios.delete("http://localhost:8080/worker/"+id);
    console.log(res);
    window.location.reload(true);
  }
  return (
    <div className='worker'>
      <p className="detail">{worker.name}</p>
      <p className="detail">{worker.rating}</p>
      <p className="detail">{worker.workingSince}</p>
      <div className="buttonW">
        <button className="removeWorkerButton" onClick={removeWorker}>
          Remove
        </button>
      </div>
    </div>
  )
}
