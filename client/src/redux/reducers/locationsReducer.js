import { ADD_LOCATION, GET_LOCATIONS } from '../types/types';

const postsReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_LOCATION:
      return [...state, payload];
    case GET_LOCATIONS:
      return payload;
    // case REMOVE_POSTS:
    //   return state.filter((el) => el.id !== payload);
    default:
      return state;
  }
};

export default postsReducer;
