import React from 'react'
import './sidebarContent.css'
import { useNavigate } from 'react-router-dom'

export default function SidebarContent({ Icon, title, id, addChannelOption, toggleDropdown, toggleHamburger }) {

  const navigate = useNavigate();
  const selectChannel = () => {
    if (id) {
      navigate(`/room/${id}`);
    } else {
      navigate(title);
    }
    if (window.innerWidth < 570) {
      toggleHamburger();
    }
  };

  const addChannel = () => {
    toggleDropdown();
  }
  return (

    <div className='sidebar_component' onClick={(addChannelOption) ? (addChannel) : (selectChannel)}>
      {Icon && <Icon className="sidebar_component_icon" />}
      {Icon ? <h3>{title}</h3> : (
        <h3>
          <div className='sidebar_component_channel'>
            <span className='sidebarhash'>#</span>{title}
          </div>
        </h3>
      )}
    </div>

  )
}
