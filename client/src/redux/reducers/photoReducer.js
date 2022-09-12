import { GET_USER_PHOTO } from '../types/types';

export default (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_USER_PHOTO:
      return payload;

      // case UNSET_LOAD:
      //   return false;

    default:
      return state;
  }
};
