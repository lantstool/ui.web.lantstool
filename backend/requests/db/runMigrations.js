import { migrations } from './migrations/index.js';
import { SQLITE_ROW } from 'wa-sqlite/src/sqlite-constants.js';
import { errorWithCode } from '../../utils/utils.js';

const query = async (sqlite, connection, sql) => {
  const rows = [];

  for await (const stmt of sqlite.statements(connection, sql)) {
    const columns = sqlite.column_names(stmt);
    while ((await sqlite.step(stmt)) === SQLITE_ROW) {
      const row = sqlite.row(stmt);
      rows.push(columns.reduce((acc, col, i) => ({ ...acc, [col]: row[i] }), {}));
    }
  }

  return rows;
};

const ensureMigrationsTable = (sqlite, connection) =>
  sqlite.exec(
    connection,
    `
      CREATE TABLE IF NOT EXISTS _migrations (
        version INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        appliedAt INTEGER NOT NULL
      );
    `,
  );

const getCurrentVersion = async (sqlite, connection) => {
  const rows = await query(sqlite, connection, 'SELECT MAX(version) as version FROM _migrations;');
  return rows[0]?.version || 0;
};

export const runMigrations = async ({ db }) => {
  const { sqlite, connection } = db;
  await ensureMigrationsTable(sqlite, connection);

  const currentVersion = await getCurrentVersion(sqlite, connection);
  const latestVersion = migrations.at(-1)?.version || 0;

  if (currentVersion > latestVersion) errorWithCode(422, 'DB version is higher than the latest version.');

  const pending = migrations
    .filter((m) => m.version > currentVersion)
    .sort((a, b) => a.version - b.version);

  if (pending.length === 0) {
    return {
      needsMigration: false,
      currentVersion,
      latestVersion,
    };
  }

  await sqlite.exec(connection, 'BEGIN TRANSACTION;');

  try {
    for (const { version, name, sql } of pending) {
      try {
        await sqlite.exec(connection, sql);
        await sqlite.exec(
          connection,
          `INSERT INTO _migrations (version, name, appliedAt) VALUES (${version}, '${name}', ${Date.now()});`,
        );
      } catch (err) {
        throw new Error(`Failed at migration v${version} (${name}): ${err.message}`);
      }
    }

    await sqlite.exec(connection, 'COMMIT;');

    const newCurrentVersion = pending.at(-1).version;

    return {
      needsMigration: false,
      currentVersion: newCurrentVersion,
      latestVersion,
    };
  } catch (error) {
    await sqlite.exec(connection, 'ROLLBACK;');
    console.error('Migration aborted. Database restored to previous state:', error);
    throw error;
  }
};
