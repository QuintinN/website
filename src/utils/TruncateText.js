export const Truncate = (str, size) => {
  return str.length > size ? str.substring(0, size) + "..." : str;
};
