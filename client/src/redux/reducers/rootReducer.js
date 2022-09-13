import { combineReducers } from 'redux';
import authReducer from './authReducer';
import loadingReducer from './loadingReducer';
import postsReducer from './postsReducer';
import locationsReducer from './locationsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  posts: postsReducer,
  locations: locationsReducer
});

export default rootReducer;
