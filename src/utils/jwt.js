export const generateToken = (user) => {
  // Dummy token
  return btoa(`${user.email}-${user.name}`);
};

export const decodeToken = (token) => {
  return atob(token);
};
