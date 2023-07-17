import React, { useEffect, useState } from 'react'
import './sidebar.css'
import { Add } from '@mui/icons-material'
import { Check } from '@mui/icons-material';
import SidebarContent from './sidebarContent'
import db from './firebase'
import { addDoc, collection, query } from 'firebase/firestore'
import { onSnapshot } from 'firebase/firestore'
import { useStateValue } from './StateProvider'

export default function Sidebar({ toggle, toggleHamburger }) {

    const [channels, setChannels] = useState([])//creating an empty array to store the channels in it
    const [newChannel, setNewChannel] = useState("");
    const [dropdown, setDropDown] = useState(false);

    const toggleDropdown = () => {
        setDropDown((dropdown) => (!dropdown));
    }

    const [{ user }, dispatch] = useStateValue()

    const submitChannel = (e) => {
        e.preventDefault();
        if (newChannel !== "") {
            addDoc(collection(db, "space"), {
                name: newChannel
            })
            console.log("Submitted")
        }
        setNewChannel("");
        toggleDropdown();
    }

    return (

        <div hidden={toggle} className={(toggle) ? ('sidebar hidesidebar') : ('sidebar')}>

            <div className="header_sidebar">

                <div className="sidebar_info">
                    <h2>Chat-Verse</h2>
                </div>
                <div>
                    {user?.displayName}
                </div>

            </div>

            <div className='sidebarchanneltitle'>Channels</div>

            {/* this has add channel option here :  */}
            <div className='add_channels_option'>
                <SidebarContent Icon={Add} addChannelOption title="Add Channel" id="add_channel" toggleDropdown={toggleDropdown} />
            </div>
            <div className='hidden_input' hidden={(!dropdown)}>
                <form onSubmit={submitChannel}>
                    <input type='text' id='newChannel' placeholder='channel name..' value={newChannel} onChange={(e) => setNewChannel(e.target.value)} />
                    <button type='submit' id="channel_submit"><Check style={{ fontSize: "12px" }} /></button>
                </form>

            </div>
            <div className='sidebar_content'>
                <div className='remaining_channels'>
                    {
                        channels.map((channel) => (
                            <SidebarContent title={channel.name} key={channel.id} id={channel.id} toggleHamburger={toggleHamburger} />))
                    }
                </div>
            </div>



        </div>
    )
}
