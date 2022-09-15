import { combineReducers } from 'redux';
import authReducer from './authReducer';
import loadingReducer from './loadingReducer';
import photoReducer from './photoReducer';
import postsReducer from './postsReducer';
import locationsReducer from './locationsReducer';
import showFormReducer from './showFormReducer';
import showComplitedReducer from './showComplitedReducer';
import photoLocationReducer from './photoLocationReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  posts: postsReducer,
  locations: locationsReducer,
  showForm: showFormReducer,
  photoUser: photoReducer,
  showComplited: showComplitedReducer,
  locationPhoto: photoLocationReducer
});

export default rootReducer;
