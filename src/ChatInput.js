import { Firestore, addDoc, collection, doc, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react'
import db from './firebase';
import { useStateValue } from './StateProvider';
import './chatinput.css'

export default function ChatInput({ channelName, channelId }) {
  const [input, setInput] = useState('')
  const [{ user }] = useStateValue();

  const sendMessage = (e) => {
    e.preventDefault();

    if (channelId) {
      addDoc(collection(doc(collection(db, "space"), channelId), "messages"), {
        message: input, timestamp: serverTimestamp(Firestore.FieldValue), user: user?.displayName, userImage: user?.photoURL
      })
    }
    setInput("");
  }

  return (
    <div className='chatinput'>

      <form onSubmit={sendMessage}>

        <input placeholder={`Message @${channelName}`} onChange={e => setInput(e.target.value)} />
        <button type="submit">Send</button>

      </form>

    </div>
  )
}
