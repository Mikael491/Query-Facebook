import StripPrefix from './../components/common/StripPrefix';

const INITIAL_STATE = {
  posts: [],
  next: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'first_fetch':
      return { ...state,
        posts: action.payload.data,
        next: StripPrefix(action.payload.paging.next) };
    case 'loading':
      return { ...state, loading: action.payload };
    case 'fetch_more':
      return { ...state,
        posts: [...state.posts, ...action.payload.data],
        next: StripPrefix(checkPaging(action.payload)),
        loading: false };
    default:
      return state;
  }
};

const checkPaging = (object) => {
  return object.paging ? object.paging.next : '';
};
