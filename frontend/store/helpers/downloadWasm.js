// TODO unite the downloadZip and create a downloadFile function instead
export const downloadWasm = (data, name) => {
  const blob = new Blob([data], { type: 'application/wasm' });

  const a = document.createElement('a');
  const url = URL.createObjectURL(blob);

  a.href = url;
  a.download = `${name}.wasm`;

  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};
