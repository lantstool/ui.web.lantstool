export const base64ToArrayBuffer = (base64String: string): ArrayBuffer => {
  const binaryString = window.atob(base64String);
  const bytes = Uint8Array.from({ length: binaryString.length }, (_, i) =>
    binaryString.charCodeAt(i),
  );
  return bytes.buffer as ArrayBuffer;
};
