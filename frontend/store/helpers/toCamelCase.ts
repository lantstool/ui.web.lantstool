const toCamelCaseImpl = (obj: unknown): unknown => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map((item) => toCamelCaseImpl(item));

  return Object.keys(obj as Record<string, unknown>).reduce<Record<string, unknown>>((acc, key) => {
    const camelKey = key
      .replace(/(_\w)/g, (match) => match.charAt(1).toUpperCase())
      .replace(/^(.)/, (letter) => letter.toLowerCase());
    const value = (obj as Record<string, unknown>)[key];

    if (value !== null && typeof value === 'object') {
      acc[camelKey] = toCamelCaseImpl(value);
    } else {
      acc[camelKey] = value;
    }

    return acc;
  }, {});
};

export const toCamelCase = <T>(obj: T): T => toCamelCaseImpl(obj) as T;
