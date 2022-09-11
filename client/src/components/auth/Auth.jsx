import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setAuthAC } from '../../redux/actions/authActions';

export default function Auth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState({ email: '', password: '' });
  const changeHandler = (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const signInHandler = async (event) => {
    event.preventDefault();
    if (input.email !== '' && input.password !== '') {
      const response = await fetch('http://localhost:3002/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(input)
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(setAuthAC(data));
        navigate('/');
      } else {
        alert('Wrong input!');
        setInput({ email: '', password: '' });
      }
    } else {
      alert('Write something!');
      setInput({ email: '', password: '' });
    }
  };

  return (
    <div className="mx-auto mt-5" style={{ width: '400px' }}>
      <div style={{ height: '150px' }} />
      <form className="container zal rounded-3 py-3 item" onSubmit={signInHandler}>
        <div className="mb-3">
          <h2>Email</h2>
          <input
            onChange={changeHandler}
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Your Name"
          />
        </div>
        <div className="mb-3">
          <h2>Password</h2>
          <input
            onChange={changeHandler}
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Your Password"
          />
        </div>
        <button type="submit" className="btn btn-danger">Sign in!</button>
        <div className="mx-auto mt-5">
          <h2>Dont register yet?</h2>
          <Link to="/registration" className="btn btn-danger">Registration</Link>
        </div>
      </form>
    </div>
  );
}
