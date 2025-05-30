export const success = (message, payload = {}) => ({
  success: true,
  message,
  payload
});

export const error = (message, code = 500) => ({
  success: false,
  message,
  code
});
