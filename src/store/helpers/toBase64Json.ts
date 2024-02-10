export const toBase64Json = <T>(object: T): string =>
  Buffer.from(JSON.stringify(object)).toString("base64");
