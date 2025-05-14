export const toCapitalCase = (str = '') => {
  return str
  .toLowerCase()
  .split(' ')
  .map((value) => value.charAt(0).toUpperCase() + value.slice(1))
  .join(' ');
};
