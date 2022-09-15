import axios from 'axios';
import {
  ADD_LIKE, ADD_POSTS, GET_POSTS, REMOVE_LIKE, REMOVE_POSTS
} from '../types/types';
import { addLocationPhoto, getLocationPhoto } from './photoLocationAction';

export const addPostsAC = (payload) => ({ type: ADD_POSTS, payload });
export const getPostsAC = (payload) => ({ type: GET_POSTS, payload });
export const addLikeAC = (payload) => ({ type: ADD_LIKE, payload });
export const removeLike = (payload) => ({ type: REMOVE_LIKE, payload });
export const removePostAC = (payload) => ({ type: REMOVE_POSTS, payload });

export const AddPostsThunk = (input) => (dispatch) => {
  console.log(input);
  axios.post(`${process.env.REACT_APP_BASEURL}/api/v1/posts`, input)
    .then((res) => dispatch(addPostsAC(res.data)))
    .catch((error) => console.log(error));
};

export const AddPostsPhotoThunk = (data) => (dispatch) => {
  console.log('input, file', data);
  fetch(`${process.env.REACT_APP_BASEURL}/api/v1/posts`, {
    method: 'post',
    // headers: {userId
    //   'Content-Type': 'multipart/form-data'
    // },
    credentials: 'include',
    body: data
  })
    .then((res) => res.json())
    .then((res) => {
      dispatch(addPostsAC(res));
      // dispatch(addLocationPhoto(res.newPhoto));
    })
    .catch((error) => console.log(error));
};

export const getAllPostsThunk = () => (dispatch) => {
  axios.get(`${process.env.REACT_APP_BASEURL}/api/v1/posts`)
    .then((res) => dispatch(getPostsAC(res.data)))
    .catch((err) => console.log(err));
};

export const addBestPostThunk = ({ postId, userId }) => (dispatch) => {
  fetch(`${process.env.REACT_APP_BASEURL}/api/v2/liked`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ postId, userId })
  }).then((res) => res.json()).then((data) => dispatch(addLikeAC(data)));
};

export const removelikeThunk = ({ postId, userId }) => (dispatch) => {
  fetch(`${process.env.REACT_APP_BASEURL}/api/v2/liked`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ postId, userId })
  }).then((res) => res.json()).then((data) => dispatch(removeLike(data)));
};

export const getAllLocationPostsThunk = (pickedBaloon) => (dispatch) => {
  fetch(`${process.env.REACT_APP_BASEURL}/api/v1/locationposts`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ pickedBaloon })
  }).then((res) => res.json())
    // .then((res) => console.log(res))
    .then((data) => {
      dispatch(getPostsAC(data));
    })
    .catch((err) => console.log(err));
};

// export const AddPostsPhotoThunk = (data) => (dispatch) => {
//   console.log('input, file', data);
//   fetch(`${process.env.REACT_APP_BASEURL}/api/v1/posts`, {
//     method: 'post',
//     // headers: {userId
//     //   'Content-Type': 'multipart/form-data'
//     // },
//     credentials: 'include',
//     body: data
//   })
//     .then((res) => res.json())
//     .then((res) => {
//       dispatch(addPostsAC(res));
//       // dispatch(addLocationPhoto(res.newPhoto));
//     })
//     .catch((error) => console.log(error));

export const removePostThunk = (id) => (dispatch) => {
  console.log(id);
  fetch(`${process.env.REACT_APP_BASEURL}/api/v1/posts/${id}`, {
    method: 'delete',
    credentials: 'include'
  })
    .then((res) => res.json())
    .then((res) => {
      if (res) {
        dispatch(removePostAC(res));
      }
    });
};
