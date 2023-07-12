import React from 'react'
import "./sidebar_component.css"

export default function Sidebarcomponent({Icon,title}) {
  return (
    <div className='sidebar_component'>
        {Icon && <Icon className="sidebar_component_icon"/> }
    </div>
  )
}
