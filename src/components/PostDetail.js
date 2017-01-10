import React from 'react';
import ReusablePostView from './ReusablePostView';

const PostDetail = ({ post }) => {
  return (
    <ReusablePostView
      post={post}
    />
  );
};

export default PostDetail;
