import { combineReducers } from 'redux';
import authReducer from './authReducer';
import loadingReducer from './loadingReducer';
import postsReducer from './postsReducer';

const rootReducer = combineReducers({

  auth: authReducer,
  loading: loadingReducer,
  posts: postsReducer
});

export default rootReducer;
