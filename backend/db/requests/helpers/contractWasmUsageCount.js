const create = async ({ execute, fileName, usageCount }) => {
  const query = `
    INSERT INTO near_protocol_transaction_contract_wasm_usage
    (fileName, usageCount)
    VALUES('${fileName}', '${usageCount}')
  `;
  await execute(query);
};

const get = async ({ execute, fileName }) => {
  const query = `
    SELECT usageCount 
    FROM near_protocol_transaction_contract_wasm_usage
    WHERE fileName = '${fileName}';
  `;
  const [row] = await execute(query);
  return row?.usageCount;
};

const update = async ({ execute, fileName, usageCount }) => {
  const query = `
    UPDATE near_protocol_transaction_contract_wasm_usage
    SET usageCount = '${usageCount}'
    WHERE fileName = '${fileName}'
  `;
  await execute(query);
};

const remove = async ({ execute, fileName }) => {
  const query = `
    DELETE FROM near_protocol_transaction_contract_wasm_usage
    WHERE fileName = '${fileName}';
  `;
  await execute(query);
};

export const contractWasmUsageCount = {
  create,
  get,
  update,
  remove,
};
