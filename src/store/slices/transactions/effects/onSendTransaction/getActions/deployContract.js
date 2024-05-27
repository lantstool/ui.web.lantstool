import { transactions } from 'near-api-js';

const readFileAndConvertToUint8Array = (file) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (fileEvent) => {
      const arrayBuffer = fileEvent.target.result;
      resolve(new Uint8Array(arrayBuffer));
    };
    fileReader.onerror = reject;
    fileReader.readAsArrayBuffer(file);
  });

export const deployContract = async (action) => {
  const file = action.file[0];
  if (!file) return;

  const code = await readFileAndConvertToUint8Array(file);

  return transactions.deployContract(code);
};
