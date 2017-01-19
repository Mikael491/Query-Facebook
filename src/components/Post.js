import React from 'react';
import ReusablePostView from './ReusablePostView';

const Post = ({ post }) => {
  return (
    <ReusablePostView
      post={post}
      timelineView
    />
  );
};

export default Post;
