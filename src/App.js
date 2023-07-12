import './design.css'
import Header from './header';
import Sidebar from './sidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chats from './chats';
import Login from './Login';
import { useStateValue } from './StateProvider';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { action_type } from './reducer';
import { DotLoader } from 'react-spinners';
import { css } from '@emotion/react';



export default function App() {
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleHamburger = () => {
    setToggle((prev) => !prev);
  };


  const [{ user }, dispatch] = useStateValue();
  const override = css`
  display: block;
  margin: 0 auto;
`;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currUser) => {
      setLoading(false); // Set loading to false after checking authentication state
      if (currUser) {
        dispatch({ type: action_type.SET_USER, user: currUser });
      } else {
        dispatch({ type: action_type.REMOVE_USER });
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch, user]);

  if (loading) {
    return <div className='loader'>
      <DotLoader color="black" loading={loading} css={override} size={80} />
    </div>
  }

  return (
    <BrowserRouter>
      {!user ? (
        <Login />
      ) : (
        <div className="chatapp">
          <Header toggleHamburger={toggleHamburger} />
          <div className="chatbody">
            <Sidebar toggle={toggle} toggleHamburger={toggleHamburger} />
            <Routes>
              <Route
                path="/room/:roomId"
                element={<Chats toggle={toggle} />}
              />
            </Routes>
          </div>
        </div>
      )}
    </BrowserRouter>
  );
}

