export const validateJson = async (json, setError, yupSchema) => {
  try {
    await yupSchema.validate({ json });
    return true;
  } catch (e) {
    setError('file', { type: 'invalidJson', message: e.message });
    return false;
  }
};
