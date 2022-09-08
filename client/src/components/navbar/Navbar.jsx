import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/actions/authActions';
import SideBarFormLogIn from '../SideBarFormLogIn/SideBarFormLogIn';

export default function Navbar() {
  // const { auth } = useSelector((state) => state);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const logoutHandler = async (e) => {
  //   e.preventDefault();
  //   const response = await fetch('http://localhost:3002/logout', { credentials: 'include' });
  //   if (response.ok) {
  //     dispatch(logout());
  //     navigate('/');
  //   }
  // };

  return (
    <div>
      <nav className="navbar zal fixed-top">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand">SAILING CLUB</NavLink>
          <NavLink to="/auth" className="nav-link middle">Auth</NavLink>
          <NavLink to="/registration" className="nav-link right">Registration</NavLink>
          <NavLink to="/" className="side-bar"><SideBarFormLogIn /></NavLink>
        </div>
      </nav>
    </div>
  );
}
