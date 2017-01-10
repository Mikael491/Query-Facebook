const StripPrefix = (queryString) => {
  if (queryString !== '') {
    return queryString.replace('https://graph.facebook.com', '');
  }
  return false;
};

export default StripPrefix;
