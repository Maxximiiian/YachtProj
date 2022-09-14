import { Box } from '@mui/material';
import React, { useState } from 'react';
import ButtonForm from './ButtonForm';
import ConectionForm from './ConectionForm';
import ButtonCend from './ButtonCend';
// #282b186b
import './Info.css';

export default function Info() {
  const [viewFormState, setViewFormState] = useState(false);
  const onClickBut = () => {
    setViewFormState(!viewFormState);
  };

  return (
    <Box
      sx={{
        width: '50%',
        display: 'flex',
        flexFlow: 'column',
        gap: 6,
        margin: '10rem auto',
        backgroundColor: '#282b186b',
        borderRadius: '24px'

      }}
    >
      <div className="about">
        <h1>О нас</h1>
        <div className="info" style={{ padding: '15px' }}>
          Морской Парусный Клуб «Sailing club» — это яхт-клуб,
          в котором вы найдёте самые лучшие морские локации и маршруты со всего мира.
          Вы сможете узнать у нас, как стать яхтсменом или
          владельцем яхты и сможете, воспользовавшись нашими услугами,
          пройти весь путь яхтсмена — от развлечения
          к увлечению, от члена команды парусной яхты до ее владельца.
        </div>
      </div>
      <ButtonForm onClickBut={onClickBut} />

      {viewFormState ? (
        <div>

          <ConectionForm
            setViewFormState={setViewFormState}
            viewFormState={viewFormState}
          />
          {/* <ButtonCend /> */}
        </div>

      ) : (null)}
    </Box>
  );
}
