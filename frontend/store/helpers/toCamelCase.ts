// Recursively converts snake_case keys to camelCase.
// Public overload preserves the caller's type at compile time;
// implementation uses `unknown` for safe runtime narrowing.
export function toCamelCase<T>(obj: T): T;
export function toCamelCase(obj: unknown): unknown {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => toCamelCase(item));
  }

  return Object.keys(obj as Record<string, unknown>).reduce<Record<string, unknown>>((acc, key) => {
    const camelKey = key
      .replace(/(_\w)/g, (match) => match.charAt(1).toUpperCase())
      .replace(/^(.)/, (letter) => letter.toLowerCase());
    const value = (obj as Record<string, unknown>)[key];

    if (value !== null && typeof value === 'object') {
      acc[camelKey] = toCamelCase(value);
    } else {
      acc[camelKey] = value;
    }

    return acc;
  }, {});
}
