/* eslint-disable no-param-reassign */
import {
  ADD_LIKE, ADD_POSTS, GET_POSTS, REMOVE_LIKE, REMOVE_POSTS
} from '../types/types';

const postsReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_POSTS:
      return [payload, ...state];
    case GET_POSTS:
      console.log(payload, 'payload>>>>>>>>>>');
      return payload;
    case ADD_LIKE:
      return state.map((el) => {
        if (el.id === payload.postId) {
          el.Likes.push(payload);
          return el;
        }
        return el;
      });
    case REMOVE_POSTS:
      return state.filter((el) => el.id !== payload.id);
    case REMOVE_LIKE:
      return state.map((el) => {
        if (el.id === payload.postId) {
          el.Likes = el.Likes.filter((e) => e.id !== payload.likeId);
        }
        return el;
      });
    default:
      return state;
  }
};

export default postsReducer;
