import { GET_USER_PHOTO, ADD_USER_PHOTO } from '../types/types';

export default (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_USER_PHOTO:
      console.log({ payload });
      return payload[0];

    case ADD_USER_PHOTO:
      return payload;

    default:
      return state;
  }
};
