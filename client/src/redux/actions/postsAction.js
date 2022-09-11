import axios from 'axios';
import { ADD_POSTS, GET_POSTS } from '../types/types';

export const addPostsAC = (payload) => ({ type: ADD_POSTS, payload });
export const getPostsAC = (payload) => ({ type: GET_POSTS, payload });

export const AddPostsThunk = (input) => (dispatch) => {
  axios.post(`${process.env.REACT_APP_BASEURL}/api/v1/posts`, input)
    .then((res) => dispatch(addPostsAC(res.data)))
    .catch((error) => console.log(error));
};

export const getAllPostsThunk = () => (dispatch) => {
  axios.get(`${process.env.PORT}/api/v1/posts`)
    .then((res) => dispatch(getPostsAC(res.data)))
    .catch((err) => console.log(err));
};
