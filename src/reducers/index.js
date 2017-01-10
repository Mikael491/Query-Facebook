import { combineReducers } from 'redux';
import PostsReducer from './PostsReducer';
import AuthReducer from './AuthReducer';

export default combineReducers({
  auth: AuthReducer,
  posts: PostsReducer
});
