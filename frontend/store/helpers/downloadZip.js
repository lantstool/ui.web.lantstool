export const downloadZip = async (zip, name) => {
  const blob = new Blob([zip], { type: 'application/zip' });

  const a = document.createElement('a');
  const url = URL.createObjectURL(blob);

  a.href = url;
  a.download = `${name}.zip`;

  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};
