import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import { display } from '@mui/system';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import ButtonCend from './ButtonCend';

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
export default function ConectionForm() {
  const [inpState, setInpState] = React.useState({
    name: '', phone: '', email: '', about: ''
  });
  const inpHandler = (e) => setInpState((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submitPotentionalUser = async () => {
    console.log(inpState);
    const response = await fetch('http://localhost:3002/potentionalRegistration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(inpState)
    });
    if (response.ok) {
      // const data = await response.json();
      alert('Ваша заявка принята');
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
      autoComplete="on"
    >
      <Input name="name" onChange={inpHandler} placeholder="Имя" inputProps={ariaLabel} />
      <Input name="phone" onChange={inpHandler} placeholder="Телефон" inputProps={ariaLabel} />
      <Input name="email" onChange={inpHandler} placeholder="e-mail" inputProps={ariaLabel} />
      <Input name="about" onChange={inpHandler} placeholder="Прочая информация" inputProps={ariaLabel} />
      <Box sx={{
        display: 'flex', borderRadius: '10%', flexWrap: 'wrap', minWidth: 300, left: '30%', top: '50%'
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
