import { combineReducers } from 'redux';
import authReducer from './authReducer';
import loadingReducer from './loadingReducer';
import postsReducer from './postsReducer';
import showFormReducer from './showFormReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  posts: postsReducer,
  showForm: showFormReducer
});

export default rootReducer;
