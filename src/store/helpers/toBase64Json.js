export const toBase64Json = (object) => Buffer.from(JSON.stringify(object)).toString('base64');
