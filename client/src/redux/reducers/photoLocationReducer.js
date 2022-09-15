import { ADD_PHOTO_LOCATION, GET_PHOTO_LOCATION } from '../types/types';

export default (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_PHOTO_LOCATION:
      // console.log({ payload });
      return payload;
    case GET_PHOTO_LOCATION:
      console.log('location reducer', payload);
      return [...state, payload];
      // case UNSET_LOAD:
      //   return false;

    default:
      return state;
  }
};
