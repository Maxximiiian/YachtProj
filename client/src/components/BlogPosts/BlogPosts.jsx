import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AttachFileIcon from '@mui/icons-material/AttachFile';
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
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { AddPostsPhotoThunk, AddPostsThunk, getAllPostsThunk, getAllLocationPostsThunk } from '../../redux/actions/postsAction';
import { addLocationAC } from '../../redux/actions/locationsAction';
import AllPosts from './AllPosts';
import { getPhotoLocationThunk } from '../../redux/actions/photoLocationAction';

export default function BlogPosts({ blogPostsState, setBlogPostsState, currentCoords }) {
  const { auth, locationPhoto } = useSelector((state) => state);
  const [locationInput, setLocationInput] = useState({ coords: currentCoords, name: '', userId: auth.id });

  const changeLocationInputHandler = (e) => {
    setLocationInput(
      (prev) => ({ ...prev, [e.target.name]: e.target.value, coords: currentCoords })
    );
  };

  const [state, setState] = React.useState({ right: false });
  const [add, setAdd] = useState(false);
  const [addPost, setAddPost] = React.useState(false);
  const [addLocation, setAddLocation] = React.useState(false);
  const [input, setInput] = useState({});
  const [inpStatelocationPhoto, setinpStatelocationPhoto] = useState({
    image: null
  });
  
  const dispatch = useDispatch();
  const posts = useSelector((store) => store.posts);

  console.log(inpStatelocationPhoto);

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
  // const locationPhotoHandler = (file) => {
  //   console.log('file', file);
  //   setinpStatelocationPhoto((prev) => ({ ...prev, file }));
  // };

  const submitHandler = (e) => {
    console.log('inputData', input);
    e.preventDefault();
    console.log('!!!!!!!!!!!!!!!!!!!!!!!', inpStatelocationPhoto.image);
    const data = new FormData();
    data.append('photoLocation', inpStatelocationPhoto.image);
    data.append('title', input.title);
    data.append('body', input.body);
    console.log('data', data);
    dispatch(AddPostsPhotoThunk(data));
    dispatch(AddPostsThunk({ ...input, coords: pickedBaloon }));
  };

  // const sendPhotoLocation = useCallback(async () => {
  //   try {
  //     const data = new FormData();
  //     data.append('avatar', inpStatelocationPhoto.image);
  //     await fetch('api/v1/photo/changePhoto', {
  //       method: 'post',

  //       credentials: 'include',
  //       body: data
  //     }).then((res) => res.json())
  //       .then((res) => {
  //         console.log(res);

  //         // dispatch(getUserPhoto(res));
  //       });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [inpStatelocationPhoto]);

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
      dispatch(addLocationAC(data));
    }
  };

  console.log('pickedBaloon=====', pickedBaloon);

  useEffect(() => {
    dispatch(getPhotoLocationThunk());
  }, []);
  
  useEffect(() => {
    console.log('=========', pickedBaloon);
    if (pickedBaloon) {
      dispatch(getAllLocationPostsThunk(pickedBaloon));
    } else {
      dispatch(getAllPostsThunk());
    }
  }, [pickedBaloon]);

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
          <Box component="form">
            <CardContent>
              <TextField className="TextField" name="title" value={input.title} onChange={handleTextTitleInputChange} fullWidth size="small" placeholder="Заголовок" color="info" />
              <TextField className="TextField" name="body" value={input.body} onChange={handleTextBodyInputChange} fullWidth size="large" placeholder="Текст" sx={{ marginTop: '2rem', textColor: 'primary' }} />

              <IconButton color="primary" aria-label="upload picture" component="label">
                <input
                  hidden
                  accept="image/*"
                  type="file"
              // onChange={(e) => setInpStateUserPhoto({ imageimage: e.target.files[0] })}
                  onChange={(e) => setinpStatelocationPhoto({ image: e.target.files[0] })}
                />
                <AttachFileIcon sx={{ color: 'azure' }} />
              </IconButton>
              <Button type="submit" sx={{ backgroundColor: 'transparent', color: 'azure' }} endIcon={<PhotoCamera />} />

              <Button type="button" onClick={submitHandler} sx={{ backgroundColor: 'transparent', color: 'azure', marginLeft: '40%' }} endIcon={<SendIcon />}>

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
      <Box>
        {posts?.map((el) => (
          <AllPosts
            // key={el.id}
            post={el}
          />
        ))}
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
