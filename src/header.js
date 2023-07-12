import React from 'react'
import './header.css'
import { Avatar } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useStateValue } from './StateProvider'
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { action_type } from './reducer';

export default function Header({toggleHamburger}) {
  
  const handleHamburgerClick = () => {
    console.log("Kaam karat aahe")
    toggleHamburger();
  };
  const [{user},dispatch] = useStateValue()
    const logOut = () => {
        signOut(auth) 
          .then(() => {
            dispatch({ type: action_type.REMOVE_USER });
          })
          .catch((error) => {
            console.log('Error logging out:', error);
          });
      };

  return (
    <div className='header'>

        <div className='left_section'>
          <button onClick={handleHamburgerClick}>
          <FontAwesomeIcon icon={faBars} style={{cursor:"pointer"}}/>
          </button>
          <button className="logout_button" onClick={(logOut)}>Log Out</button>
            <Avatar className='avatar_header' alt={user?.displayName} src={user?.photoURL}/>
        </div>
        

     </div>
  )
}
