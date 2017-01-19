import { NativeModules } from 'react-native';
import StripPrefix from './../components/common/StripPrefix';

var FacebookService = NativeModules.FacebookService;

export const loginToFacebook = (access_token) => {
  return (dispatch) => {
    FacebookService.login(access_token, (error, result) => {
      if (!error) {
          dispatch({ type: 'login', payload: true });
      } else {
        console.log(error);
      }
    });
  };
};

export const fetchPosts = () => {
  return (dispatch) => {
    FacebookService.fetchPosts((error, result) => {
      if (!error) {
        dispatch({ type: 'first_fetch', payload: result });
      }
    });
  };
};

export const fetchMorePosts = (queryString) => {
  return (dispatch) => {
    dispatch({ type: 'loading', payload: true });

    FacebookService.fetchMorePosts(queryString, (error, result) => {
      if (!error) {
        dispatch({ type: 'fetch_more', payload: result });
      }
    });
  };
};

export const likePost = (objectID) => {
  return (dispatch) => {
    FacebookService.likePost(objectID, (error, result) => {
      if (!error) {
        console.log(result);
      } else {
        //Error =
        // {
        //   "error": {
        //     "message": "(#3) Publishing likes through the API is only available for page access tokens",
        //     "type": "OAuthException",
        //     "code": 3,
        //     "fbtrace_id": "EzSLRz/uzdx"
        //   }
        // }
        console.log(error);
      }
    });
  };
};
