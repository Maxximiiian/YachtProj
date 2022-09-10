import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setAuth } from '../../redux/actions/authActions';
import './Auth.css';

export default function Registration() {
  const [input, setInput] = useState({
    email: '', name: '', password: '', repeat: ''
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeHandler = (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const signUpHandler = async (event) => {
    event.preventDefault();
    if (input.email !== '' && input.password !== '') {
      if (input.password === input.repeat) {
        const response = await fetch('http://localhost:3002/registration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(input)
        });
        if (response.ok) {
          const data = await response.json();
          dispatch(setAuth(data));
          navigate('/');
        } else {
          alert('Такой пользователь уже существует');
          setInput({
            email: '', name: '', password: '', repeat: ''
          });
        }
      } else {
        alert('Повторите ввод');
        setInput({
          email: '', name: '', password: '', repeat: ''
        });
      }
    } else {
      alert('Введи хоть че-нибудь!');
      setInput({
        email: '', name: '', password: '', repeat: ''
      });
    }
  };

  return (
    <div className="mx-auto mt-5" style={{ width: '400px' }}>
      <div style={{ height: '150px' }} />
      <form onSubmit={signUpHandler} className="container zal rounded-3 py-3 item">
        <div className="mb-3">
          <h2>E-mail</h2>
          <input
            onChange={changeHandler}
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Email"
          />
        </div>
        <div className="mb-3">
          <h2>Name</h2>
          <input
            value={input.name}
            onChange={changeHandler}
            type="name"
            name="name"
            className="form-control"
            id="exampleInputName1"
            placeholder="Name"
          />
        </div>
        <div className="mb-3">
          <h2>ID</h2>
          <input
            // value={input.name}
            // onChange={changeHandler}
            type="name"
            name="name"
            className="form-control"
            id="exampleInputName1"
            placeholder="Name"
          />
        </div>
        <div className="mb-3">
          <h2>Personal Password</h2>
          <input
            value={input.password}
            onChange={changeHandler}
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <div>
          <button style={{ marginLeft: '40%' }} type="submit" className="btn btn-danger">Sign Up!</button>
        </div>
      </form>
    </div>
  );
}
