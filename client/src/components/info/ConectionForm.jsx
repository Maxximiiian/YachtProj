import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import { display } from '@mui/system';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ButtonCend from './ButtonCend';
import { SET_SHOW_COMPLITED } from '../../redux/types/types';

const image = {
  url: '/static/images/buttons/breakfast.jpg',
  title: 'Отправить обращение',
  width: '100%'
};
const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 70,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15
    },
    '& .MuiImageMarked-root': {
      opacity: 0
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor'
    }
  }
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%'
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#f8f9fa'
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  borderRadius: '21px',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: '#282b18d1',
  opacity: 0.4,
  transition: theme.transitions.create('opacity')
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: '#f8f9fa',
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity')
}));

const ariaLabel = { 'aria-label': 'description' };

export default function ConectionForm({ setViewFormState, viewFormState }) {
  const dispatch = useDispatch();
  const [inpState, setInpState] = React.useState({
    name: '', phone: '', email: '', about: ''
  });
  const inputStyle = { backgroundcolor: 'blue' };
  const inpHandler = (e) => setInpState((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submitPotentionalUser = async () => {
    const response = await fetch('http://localhost:3002/potentionalRegistration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(inpState)
    });
    if (response.ok) {
      setViewFormState(!viewFormState);
      dispatch({ type: SET_SHOW_COMPLITED });
    }
  };
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': {
          mt: 3, top: '75%', display: 'flex', flexDirection: 'column', color: 'white', borderRadius: '5px', padding: '10px '
        }
      }}
      noValidate
    >
      <TextField className="input" name="name" autoComplete="off" onChange={inpHandler} style={{ labelColor: 'white' }} label="Имя" inputProps={inputStyle} />
      <TextField className="input" name="phone" autoComplete="off" onChange={inpHandler} label="Телефон" inputProps={ariaLabel} />
      <TextField className="input" name="email" autoComplete="off" onChange={inpHandler} label="e-mail" inputProps={ariaLabel} />
      <TextField className="input" name="about" autoComplete="off" onChange={inpHandler} label="Прочая информация" inputProps={ariaLabel} />
      <Box sx={{
        display: 'flex', borderRadius: '10%', flexWrap: 'wrap', minWidth: 300, left: '30%', top: '50%', color: 'white'
      }}
      >

        <ImageButton
          focusRipple
          key={image.title}
          style={{
            width: '100%'
          }}
        >
          {/* <ImageSrc style={{ backgroundImage: `url(${image.url})` }} /> */}
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              onClick={submitPotentionalUser}
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`
              }}
            >
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>

      </Box>
    </Box>
  );
}
