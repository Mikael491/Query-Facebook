const INITIAL_STATE = {
  liked: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'like-post':
      return { liked: action.payload };
    default:
      return state;
  }
};
