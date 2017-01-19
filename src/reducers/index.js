import { combineReducers } from 'redux';
import PostsReducer from './PostsReducer';
import AuthReducer from './AuthReducer';
import LikeReducer from './LikeReducer';

export default combineReducers({
  auth: AuthReducer,
  posts: PostsReducer,
  likes: LikeReducer
});
