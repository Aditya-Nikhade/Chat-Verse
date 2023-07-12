import React from 'react'
import './Message.css'

export default function Message({message,timestamp,user,userImage}) {
  
  return (
    <div className='msg'>

        <img src={userImage} alt={user}/>

        <div className="msg_info">
            <h4>
                {user}<span className='timestamp'>{new Date(timestamp?.toDate()).toUTCString()}</span> 
            </h4>
            <p>{message}</p>
        </div>

    </div>
  )
}
