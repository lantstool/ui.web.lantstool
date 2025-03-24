import { addPrefixToObjKeys } from './addPrefixToObjKeys.js';

const create = async ({ execute, fileName, usageCount }) => {
  const query = `
    INSERT INTO near_protocol_transaction_contract_wasm_usage
      VALUES(
        @fileName, 
        @usageCount
      );
  `;
  await execute(query, addPrefixToObjKeys({ usageCount, fileName }));
};

const get = async ({ execute, fileName }) => {
  const query = `
    SELECT usageCount 
    FROM near_protocol_transaction_contract_wasm_usage
    WHERE fileName = @fileName;
  `;
  const [row] = await execute(query, addPrefixToObjKeys({ fileName })
  );
  return row?.usageCount;
};

const update = async ({ execute, fileName, usageCount }) => {
  const query = `
    UPDATE near_protocol_transaction_contract_wasm_usage
    SET usageCount = @usageCount
    WHERE fileName = @fileName
  `;
  await execute(query, addPrefixToObjKeys({ usageCount, fileName }));
};

const remove = async ({ execute, fileName }) => {
  const query = `
    DELETE FROM near_protocol_transaction_contract_wasm_usage
    WHERE fileName = @fileName;
  `;
  await execute(query, addPrefixToObjKeys({ fileName }));
};

export const contractWasmUsageCount = {
  create,
  get,
  update,
  remove,
};
