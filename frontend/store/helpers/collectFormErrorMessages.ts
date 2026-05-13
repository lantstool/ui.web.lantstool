import type { FieldErrors } from 'react-hook-form';

// We want to return the flat error array instead of having a tree -
// we display only the first error even if multiple errors are present
export const collectFormErrorMessages = (errors: FieldErrors): string[] => {
  const messages: string[] = [];

  const extractMessages = (obj: unknown): void => {
    if (typeof obj !== 'object' || obj === null) return;
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'object' && value !== null) {
        extractMessages(value);
      } else if (key === 'message' && typeof value === 'string') {
        messages.push(value);
      }
    }
  };

  extractMessages(errors);
  return messages;
};
