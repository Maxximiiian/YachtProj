import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './components/auth/Auth';
import NotAuth from './components/auth/NotAuth';
import Registration from './components/auth/Registration';
import Main from './components/main/Main';
import Navbar from './components/navbar/Navbar';
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
      <Navbar />
      <Routes>
        <Route path="*" element={<Main />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/notauth" element={<NotAuth />} />
      </Routes>
    </>

  );
}

export default App;
