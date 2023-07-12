import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './chats.css'
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import db from './firebase';
import Message from './Message';
import ChatInput from './ChatInput';

export default function Chats({ toggle }) {

    const { roomId } = useParams();
    const [roomDetails, setRoomDetails] = useState(null)
    const [roomMessages, setRoomMessages] = useState([])

    //roomdetails and roommessages not holding anything. everytime you go to a new room, both get updated.

    useEffect(() => {
        if (roomId) {
            const docRef = doc(collection(db, "space"), roomId)
            onSnapshot(docRef, (snapshot) => {
                setRoomDetails(snapshot.data())
            })
        }
        const q = query(collection(doc(collection(db, "space"), roomId), "messages"), orderBy("timestamp", "asc"))
        onSnapshot(q, (snapshot) => {
            setRoomMessages(
                snapshot.docs.map((doc) => (doc.data()))
            )
        })
    }, [roomId])


    return (

        <div className={(toggle) ? ('chat hidechat') : ('chat')}>

            <div className="header_chat">

                <div className="left_header_chat">
                    <h4 className="channel_name">
                        <strong>#{roomDetails?.name}</strong>
                    </h4>
                </div>
            </div>

            <div className='chat_msgs'>
                {roomMessages.map((doc) => {
                    return <Message message={doc.message} key={doc.id} timestamp={doc.timestamp} user={doc.user} userImage={doc.userImage} />
                })}
            </div>

            <ChatInput className='chatinput' channelName={roomDetails?.name} channelId={roomId} />

        </div>
    )
}
