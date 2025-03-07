export const errorWithCode = (code, message) => {
  const error = new Error();
  error.code = code;
  error.message = message;
  throw error;
};

export const serializeApostrophe = (str) => str.replace(/'/g, "''");
