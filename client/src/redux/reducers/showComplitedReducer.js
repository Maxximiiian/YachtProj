import { SET_SHOW_COMPLITED } from '../types/types';

const t = (state = { status: false }, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_SHOW_COMPLITED:
      return { status: !state.status };
    default:
      return state;
  }
};

export default t;
