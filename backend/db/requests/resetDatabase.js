import setupDatabaseSQL from '../preparation/setupDatabase.sql';

export const resetDatabase = async ({ execute }) => {
  const query = `
    BEGIN TRANSACTION;
    
    DROP TABLE IF EXISTS spaces;
    DROP TABLE IF EXISTS near_protocol_networks;
    DROP TABLE IF EXISTS near_protocol_transactions;
    DROP TABLE IF EXISTS near_protocol_calls;
    DROP TABLE IF EXISTS near_protocol_accounts;
    DROP TABLE IF EXISTS near_protocol_keys;
    DROP TABLE IF EXISTS near_protocol_counters;
    
    COMMIT;
  `;

  await execute(query);
  await execute(setupDatabaseSQL);
};
