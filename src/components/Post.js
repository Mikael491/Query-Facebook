import React, { Component } from 'react';
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ReusablePostView from './ReusablePostView';

class Post extends Component {

  toDetail() {
    const { post } = this.props;
    Actions.detail({ post });
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.toDetail.bind(this)}
        activeOpacity={1}
      >
        <ReusablePostView
          post={this.props.post}
          addLikeButton={true}
        />
      </TouchableOpacity>
    );
  }
}

export default Post;
