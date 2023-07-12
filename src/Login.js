import React from 'react'
import './Login.css'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from './firebase'
import { useStateValue } from './StateProvider'
import { action_type } from './reducer'
import picture from './Pix.jpeg'

export default function Login() {
  const [{ user }, dispatch] = useStateValue()

  const signIn = async () => {
    try {
      const a = await signInWithPopup(auth, googleProvider)
      console.log(a)
      dispatch({ type: action_type.SET_USER, user: a.user })
    } catch (error) {
      console.log(error)
    }
  }
  if (user) {
    return <redirect to="/" />; // Redirect to the home page if user is already authenticated
  }

  return (
    <div className='login'>
      <div className='details'>
        <img src={picture} alt='' />
        <h1>Sign in to<br />Chat-Verse</h1>
        <br />
        <button onClick={signIn}>Sign in with Google</button>
      </div>
    </div>
  )
}
