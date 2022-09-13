import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import { red } from '@mui/material/colors';
import {
  Avatar, Box, Button, ButtonGroup, IconButton, Link, SwipeableDrawer, TextField
} from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ToggleButton from '@mui/material/ToggleButton';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import DoubleArrowSharpIcon from '@mui/icons-material/DoubleArrowSharp';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import SendIcon from '@mui/icons-material/Send';
import './BlogPosts.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AddPostsThunk, getAllPostsThunk } from '../../redux/actions/postsAction';
import { addLocationAC } from '../../redux/actions/locationsAction';

export default function BlogPosts({ blogPostsState, setBlogPostsState, currentCoords }) {
  // const BLYA = [...currentCoords];
  console.log('fghfghfghfghfg', currentCoords);
  const { auth } = useSelector((state) => state);
  const [locationInput, setLocationInput] = useState({ coords: currentCoords, name: '', userId: auth.id });

  console.log('locationInput', locationInput);

  const changeLocationInputHandler = (e) => {
    console.log('handlerInput', currentCoords);
    setLocationInput(
      (prev) => ({ ...prev, [e.target.name]: e.target.value, coords: currentCoords })
    );
  };

  const [state, setState] = React.useState({ right: false });
  const [add, setAdd] = useState(false);
  const [addPost, setAddPost] = React.useState(false);
  const [addLocation, setAddLocation] = React.useState(false);
  const [input, setInput] = useState({});
  const dispatch = useDispatch();
  const posts = useSelector((store) => store.posts);
  console.log('ppppp', posts);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event
      && event.type === 'keydown'
      && (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setBlogPostsState({ ...blogPostsState, [anchor]: open });
  };

  const handleTextTitleInputChange = (e) => {
    setInput((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleTextBodyInputChange = (e) => {
    setInput((prev) => ({ ...prev, body: e.target.value }));
  };
  console.log(input);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(AddPostsThunk(input));
  };

  const locationAddHandler = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3002/api/v1/locations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(locationInput)
    });
    if (response.ok) {
      const data = await response.json();
      // console.log('=====================f=DATAAA', data);
      dispatch(addLocationAC(data));
    }
  };

  useEffect(() => {
    dispatch(getAllPostsThunk());
  }, []);

  const list = (anchor) => (
    <Box
      sx={{
        maxWidth: 500,
        backgroundColor: '#00000000 !important',
        opacity: '0.8',
        boxShadow: 'none',
        height: '100%',
        color: 'azure'
      }}
    >
      <Button sx={{ backgroundColor: 'transparent', color: 'burlywood' }} component={Link} to="/points" onClick={() => setBlogPostsState((prev) => ({ ...prev, [anchor]: false }))}><DoubleArrowSharpIcon /></Button>
      <Box>
        <Button onClick={() => setAdd(!add)} variant="h1" color="text.secondary" sx={{ marginLeft: '30%' }}>
          Добавить
        </Button>
        { add
        && (
        <>
          <Button onClick={() => { setAddLocation(!addLocation); setAddPost(false); }} variant="h1" color="text.secondary" sx={{ marginLeft: '30%' }}>
            Локацию
          </Button>
          <Button onClick={() => { setAddPost(!addPost); setAddLocation(false); }} variant="h1" color="text.secondary" sx={{ marginLeft: '35%' }}>
            Пост
          </Button>

        </>
        )}
      </Box>
      {!addPost ? null
        : (
          <Box component="form" onSubmit={submitHandler}>
            <CardContent>
              <TextField className="TextField" name="title" value={input.title} onChange={handleTextTitleInputChange} fullWidth size="small" placeholder="Заголовок" color="info" />
              <TextField className="TextField" name="body" value={input.body} onChange={handleTextBodyInputChange} fullWidth size="large" placeholder="Текст" sx={{ marginTop: '2rem', textColor: 'primary' }} />
              <Button type="submit" onClick={submitHandler} sx={{ backgroundColor: 'transparent', color: 'azure', marginLeft: '40%' }} endIcon={<SendIcon />}>
                Добавить
              </Button>
            </CardContent>
          </Box>
        )}
      {!addLocation ? null
        : (
          <Box component="form">
            <CardContent>
              <TextField className="TextField" name="name" value={locationInput.name} onChange={changeLocationInputHandler} fullWidth size="small" placeholder="Location" color="info" />
              <Button type="button" onClick={locationAddHandler} sx={{ backgroundColor: 'transparent', color: 'azure', marginLeft: '30%' }} endIcon={<SendIcon />}>
                Добавить
              </Button>
            </CardContent>
          </Box>
        )}
      <Box sx={{
        backgroundColor: '#f8f9fa24',
        borderRadius: '25px',
        margin: '10px'
      }}
      >
        <Typography component="legend" sx={{ marginTop: '3rem' }} />
        <CardHeader
          sx={{
            color: 'azure'
          }}
          avatar={(
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
        )}
          action={(
            <IconButton aria-label="settings" />
        )}
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            A million voices
          </Typography>
          <Typography sx={{ color: 'azure' }} variant="body2">
            We are the worlds people
            Different yet were the same
            We believe
            We believe in a dream

            Praying for peace and healing
            I hope we can start again
            We believe
            We believe in a dream
          </Typography>
        </CardContent>
        <ButtonGroup>
          <IconButton color="primary" aria-label="add to shopping cart" fontSize="large">
            <ThumbUpOffAltIcon sx={{ marginLeft: '1rem' }} />
          </IconButton>
          <IconButton color="primary" aria-label="add to shopping cart" fontSize="large">
            <ThumbDownOffAltIcon sx={{ marginLeft: '1rem' }} />
          </IconButton>
        </ButtonGroup>
      </Box>
    </Box>
  );

  return (
    <div style={{ width: 'max-content', marginLeft: 'auto' }}>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>

          {/* <Button onClick={toggleDrawer(anchor, true)}>
            <ToggleButton value="justify" key="justify">
              <FormatAlignJustifyIcon />
            </ToggleButton>
          </Button> */}

          <SwipeableDrawer
            anchor={anchor}
            open={blogPostsState[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
