import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import './Info.css';
import { useDispatch } from 'react-redux';
import { SET_SHOW_COMPLITED } from '../../redux/types/types';

const image = {
  url: '/static/images/buttons/breakfast.jpg',
  title: 'Понятно',
  width: '100px'
};
const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 100,
  // width: 1050,
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
  // position: 'absolute',
  borderRadius: '21px',
  justifyContent: 'center',
  margin: '0 auto',
  // left: 100,
  // right: 0,
  // top: 0,
  bottom: 0,
  backgroundColor: 'black',
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
  width: '70%',
  height: '85px'
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  // backgroundColor: '#f8f9fa',
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity')
}));

export default function CompliteWindow() {
 const dispatch = useDispatch();

  const onClickPonyatno = () => {
    dispatch({ type: SET_SHOW_COMPLITED });
  };
  return (
    <div
      className="comlitedWindow"
      style={{
        color: 'white',
        width: '600px',
        height: '500px',
        backdropFilter: 'blur(2.2px)',
        backgroundColor: 'rgb(30 33 47 / 36%)',
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '10%',
        borderRadius: '21px'

      }}
    >
      <div><h1>Выша завка принята</h1></div>
      <div>
        <Box sx={{
          display: 'flex', borderRadius: '10%', flexWrap: 'wrap', minWidth: 300, left: '30%', top: '50%', marginTop: '15%'
        }}
        >

          <ImageButton
            focusRipple
            key={image.title}
            style={{
              width: '100%'
            }}
          >
            <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <Image>
              <Typography
                onClick={onClickPonyatno}
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
      </div>
    </div>

  );
}
