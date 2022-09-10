import { Box } from '@mui/material';
import React, { useState } from 'react';
import ButtonForm from './ButtonForm';
import ConectionForm from './ConectionForm';
import ButtonCend from './ButtonCend';

import './Info.css';

export default function Info() {
  const [getForm, setGetForm] = useState(false);
  const [inputOne, setInputOne] = useState('');
  const [inputTwo, setInputTwo] = useState('');
  const [inputThree, setInputThree] = useState('');
  const [inputFour, setInputFour] = useState('');
  console.log(inputOne, inputTwo, inputThree, inputFour);
  const onClickBut = () => {
    setGetForm(!getForm);
  };
  const onClickCend = (inputOne, inputTwo, inputThree, inputFour) => {
    const arrCend = {
      name: inputOne, phone: inputTwo, email: inputThree, about: inputFour
    };
  };
  return (
    <Box sx={{
      width: '50%', display: 'flex', flexFlow: 'column', color: 'white', gap: 6, margin: '10rem auto'
    }}
    >
      <div className="about">
        <div><h1>О нас</h1></div>
        <div className="info">
          много текста
        </div>
      </div>
      <ButtonForm onClickBut={onClickBut} />
      {getForm === true ? (
        <div>
          <ConectionForm />
          <ButtonCend />
        </div>
      ) : (<div />) }

    </Box>
  );
}
