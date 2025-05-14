export const success = (message, data = {}) => ({
  success: true,
  message,
  data
});

export const error = (message, code = 500) => ({
  success: false,
  message,
  code
});
