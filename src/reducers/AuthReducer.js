const INITIAL_STATE = {
  loggedIn: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'login':
      return { ...state, loggedIn: true };
    default:
      return state;
  }
};
