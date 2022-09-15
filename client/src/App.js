import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AdminPage from './components/adminPage/AdminPage';
import Auth from './components/auth/Auth';
import Registration from './components/auth/Registration';
import Info from './components/info/Info';
import PersonalPage from './components/LK/PersonalPage';
import Main from './components/main/Main';
import Map from './components/map/Map';
import AdminReg from './components/Modals/AdminReg';
import Navbar from './components/navbar/NavBar';
import RequireAuth from './components/RequireAuth/RequireAuth';
import Ways from './components/Ways/Ways';
import { setAuthAC, userCheck } from './redux/actions/authActions';
import { unsetLoad } from './redux/actions/loadActions';
import { getUserPhotoThunk } from './redux/actions/photoActions';

function App() {
  const auth = useSelector((store) => store.auth);
  console.log(auth);
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

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userCheck());
  }, []);
  useEffect(() => {
    if (auth.id) {
      dispatch(getUserPhotoThunk(auth.id));
    }
  }, [auth]);

  return (
    <>
      <Navbar />

      <Routes>
        {!auth
        && <Route path="/" element={<Info />} />}
        {auth
        && (
        <>
          <Route path="/" element={<Main />} />
          <Route path="/admin" element={<RequireAuth><AdminPage /></RequireAuth>} />
          <Route path="/map" element={(<RequireAuth><Map /></RequireAuth>)} />
          <Route path="/perspage" element={<RequireAuth><PersonalPage /></RequireAuth>} />
          {/* <Route path="/adminreg" element={<PersonalPage />} /> */}
        </>
        )}
      </Routes>
    </>
  );
}

export default App;
