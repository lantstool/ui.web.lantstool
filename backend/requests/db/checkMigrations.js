import { migrations } from './migrations/index.js';

export const checkMigrations = async ({ db }) => {
  const tableCheck = await db.execute(`
    SELECT COUNT(*) as count FROM sqlite_master
    WHERE type = 'table' AND name = '_migrations';
  `);

  if (!tableCheck?.[0]?.count) {
    return {
      needsMigration: true,
      currentVersion: 0,
      latestVersion: migrations.at(-1).version,
    };
  }

  const rows = await db.execute('SELECT MAX(version) as version FROM _migrations;');

  const currentVersion = rows[0].version ?? 0;
  const latestVersion = migrations.at(-1).version;

  return {
    needsMigration: currentVersion < latestVersion,
    currentVersion,
    latestVersion,
  };
};
