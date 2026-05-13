import { Buffer } from 'buffer';

export const toBase64 = (value: string | Uint8Array): string =>
  Buffer.from(value).toString('base64');
