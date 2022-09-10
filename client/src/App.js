import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './components/auth/Auth';
import Registration from './components/auth/Registration';
import Info from './components/info/Info';
import PersonalPage from './components/LK/PersonalPage';
import Main from './components/main/Main';
import Map from './components/map/Map';
import Navbar from './components/navbar/NavBar';
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
        <Route path="/admin" element={<Registration />} />
        <Route path="/map" element={<Map />} />
        <Route path="/perspage" element={<PersonalPage />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </>

  );
}

export default App;
