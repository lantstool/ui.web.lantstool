/**
 * We have to manage the tx WASM files when user save the transaction;
 * We can have the next cases:
 * - User adds the Deploy Contract action for the first time - we want to save it
 *  in OPFS and write the record with usageCounter = 1;
 *  - User add another tx with the same WASM - increase the counter by 1 - usageCounter = 2;
 *  - User has saved tx with a one [Deploy Contract action / WASM A]. He deletes
 *  this action and add 2 similar actions (abstract case) which has different indexes -
 *  increase the counter by 1 (-1 usage + 2 usages) - usageCounter = 3;
 *  - User delete the tx from example above - decrease the counter by 2 - usageCounter = 1;
 *  - User delete last action with this WASM - remove it from OPFS + remove record;
 *
 *  Steps:
 *  - Get list of WASM files in the tx and compare with the saved version, calculate
 *  the difference - output will look like:
 *  [{ 'contract_a': 1 }, { 'contract_b': -1 }]
 *  - Check if contract_a already exists in the OPFS;
 *  If yes - update the counter;
 *  If not - create a file and add the record;
 *  - Update contract_b counter;
 *  If the counter after update = 0 then remove the file and the record;
 */



export const updateTxBody = async ({ execute, request }) => {
  const { transactionId, body } = request.body;

  // handle contracts

  const query = `
    UPDATE near_protocol_transactions
    SET body = '${JSON.stringify(body)}'
    WHERE transactionId = '${transactionId}'
    RETURNING *;
  `;

  const [transaction] = await execute(query);
  transaction.body = JSON.parse(transaction.body);
  return transaction;
};

// const FOLDER_PATH = 'near-protocol/contracts';
// const isContractExists = await opfs.isFileExist({ path: FOLDER_PATH, name: hashedName });
// if (!isContractExists) await opfs.uploadFile({ file, path: FOLDER_PATH, name: hashedName });
