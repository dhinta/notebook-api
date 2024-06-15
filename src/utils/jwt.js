export const generateToken = (user) => {
  // Dummy token
  return btoa(`${user.email}-${user.name}`);
};
