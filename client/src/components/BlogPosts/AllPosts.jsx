import {
  Avatar, Button, ButtonGroup,
  CardContent, CardHeader, IconButton, ImageList, ImageListItem, Typography
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import { red } from '@mui/material/colors';
import { Box } from '@mui/system';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addBestPostThunk, getAllPostsThunk, removelikeThunk, removePostThunk
} from '../../redux/actions/postsAction';
import './BlogPosts.css';

export default function AllPosts({ post }) {
  console.log('TOCHNO BLYS TO VHTO NYDHNGFNFGn', post);
  const {
    Likes,
    LocationPhotos,
    User,
    body,
    createdAt,
    id,
    locationId,
    title,
    updatedAt,
    userId
  } = post;

  // const location = useSelector((store) => store.locations);
  // const { name } = location;

  // const data = new Date(createdAt).toLocaleDateString();

  const dispatch = useDispatch();
  const { auth } = useSelector((s) => s);

  const addLike = () => {
    dispatch(addBestPostThunk({ postId: post.id, userId: User?.id }));
  };

  const fetchLike = () => {
    dispatch(getAllPostsThunk());
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    dispatch(removelikeThunk({ postId: post.id, userId: User?.id }));
    fetchLike();
  };

  const removePost = (e) => {
    e.preventDefault();
    dispatch(removePostThunk(post.id));
  };

  console.log('User.UserPhotos', User.UserPhotos?.[0]?.image);

  return (
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
          <IconButton>
            <Avatar aria-label="recipe" sx={{ width: 50, height: 50 }}>
              <img
                src={`http://localhost:3002/images/${User.UserPhotos?.[0]?.image}`}
                alt="Remy Sharp"
                loading="lazy"
                style={{ width: 50, height: 50 }}
              />
            </Avatar>
          </IconButton>
        )}
        action={(
          <IconButton aria-label="settings" />
        )}
        title={User?.name}
        subheader={createdAt.split('T')[0]}
      />
      {/* <img src={`http://localhost:3002/images/${locationPhoto?.image}`} alt="hui" /> */}
      <ImageList
        sx={{
          width: 200, height: 150, alignItems: 'center', marginLeft: '40px', borderRadius: '30px'
        }}
        variant="quilted"
      >
        <ImageListItem>
          <img
            src={`http://localhost:3002/images/${LocationPhotos?.[0]?.image}`}
              // {...srcset(item.img, 121, item.rows, item.cols)}
            alt="img"
            loading="lazy"
          />
        </ImageListItem>
      </ImageList>
      <CardContent>
        <Typography sx={{ color: 'azure' }} gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ color: 'azure' }} variant="body2">
          {body}
        </Typography>
      </CardContent>
      <ButtonGroup>
        {/* <IconButton color="success"> */}
        {Likes.filter((el) => el.userId === auth.id).length === 0
          ? (
            <Button variant="text" onClick={addLike} text="LIKE">
              <ThumbUpIcon fontSize="large" sx={{ marginLeft: '1rem', color: 'yellow' }} />
              {Likes.length}
            </Button>
          )
          : (
            <Button variant="text" onClick={deleteHandler} text="DISLIKE">
              <ThumbUpIcon fontSize="large" sx={{ marginLeft: '1rem', color: 'red' }} style={{ transform: 'rotate(180deg)' }} />
              {Likes.length}
            </Button>
          )}
        {/* </IconButton> */}
      </ButtonGroup>
      {auth.id === User.id ? (
        <ButtonGroup>
          <Button onClick={removePost} variant="text" text="REMOVE">
            <DeleteSharpIcon fontSize="large" sx={{ marginLeft: '14rem', color: 'red' }} />
          </Button>
        </ButtonGroup>
      ) : null}

    </Box>
  );
}
