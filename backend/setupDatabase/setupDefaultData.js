import { v4 as uuidv4 } from 'uuid';

export const setupDefaultData = async (execute) => {
  const appSettings = JSON.stringify({
    isSidebarMinimized: false,
    transactionsSidebarSize: 250,
    callsSidebarSize: 250,
  });
  const timestamp = Date.now();

  const query = `
    BEGIN TRANSACTION;
    
    INSERT OR IGNORE INTO settings (key, value) VALUES
      ('history', '{}'),
      ('appVersion', '1.4.0'),
      ('appSettings', '${appSettings}');
    
    INSERT INTO users (userId, createdAt, role)
    SELECT '${uuidv4()}', '${timestamp}', 'owner'
    WHERE NOT EXISTS (SELECT 1 FROM users WHERE role = 'owner');
    
    COMMIT;
  `;

  await execute(query);
};
