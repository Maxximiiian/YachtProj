import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './components/auth/Auth';
import Registration from './components/auth/Registration';
import Main from './components/main/Main';
import NavBar from './components/navbar/NavBar';
import SideBarFormLogIn from './components/SideBarFormLogIn/SideBarFormLogIn';
import { setAuth } from './redux/actions/authActions';
import { unsetLoad } from './redux/actions/loadActions';

function App() {
  // const { loading } = useSelector((s) => s);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   fetch('http://localhost:3002/auth', {
  //     credentials: 'include'
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data) {
  //         dispatch(setAuth(data));
  //         dispatch(unsetLoad());
  //       } else {
  //         dispatch(unsetLoad());
  //       }
  //     });
  // }, []);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="*" element={<Main />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </>

  );
}

export default App;
