// We want to return the flat error array instead of having a tree -
// we display only the first error even if multiple errors are present
export const collectFormErrorMessages = (errors) => {
  const messages = [];

  const extractMessages = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        extractMessages(obj[key]);
      } else if (key === 'message') {
        messages.push(obj[key]);
      }
    }
  };

  extractMessages(errors);
  return messages;
};
