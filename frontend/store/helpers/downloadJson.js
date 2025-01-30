// TODO unite the downloadZip and create a downloadFile function instead
export const downloadJson = (data, name) => {
  const blob = new Blob([data], { type: 'application/json' });

  const a = document.createElement('a');
  const url = URL.createObjectURL(blob);

  a.href = url;
  a.download = `${name}.json`;

  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};
