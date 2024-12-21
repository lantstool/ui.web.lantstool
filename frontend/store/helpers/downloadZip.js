export const downloadZip = async (zipped, name) => {
  const blob = new Blob([zipped], { type: 'application/zip' });

  const a = document.createElement('a');
  const url = URL.createObjectURL(blob);

  a.href = url;
  a.download = `${name}.zip`;

  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};
