const INITIAL_STATE = {
  liked: false,
  color: '#B20000'
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'like-post':
      return { ...state, liked: action.payload };
    default:
      return state;
  }
};
