import { ADD_POSTS, GET_POSTS, REMOVE_POSTS } from '../types/types';

const postsReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_POSTS:
      return [...state, payload];
    case GET_POSTS:
      return payload;
    case REMOVE_POSTS:
      return state.filter((el) => el.id !== payload);
    default:
      return state;
  }
};

export default postsReducer;
