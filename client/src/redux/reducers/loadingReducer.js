import { SET_LOAD, UNSET_LOAD } from '../types/types';

export default (state = true, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_LOAD:
      return true;

    case UNSET_LOAD:
      return false;

    default:
      return state;
  }
};
