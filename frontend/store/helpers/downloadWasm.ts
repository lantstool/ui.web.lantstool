// TODO unite the downloadZip and create a downloadFile function instead
export const downloadWasm = (data: Uint8Array<ArrayBuffer>, name: string): void => {
  const blob = new Blob([data], { type: 'application/wasm' });

  const a = document.createElement('a');
  const url = URL.createObjectURL(blob);

  a.href = url;
  a.download = `${name}.wasm`;

  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};
