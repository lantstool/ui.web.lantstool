import { v1 } from './db.v1.js';
import { v2 } from './db.v2.js';

export const migrations = [
  { version: 1, name: 'initialSchema', sql: v1 },
  // { version: 2, name: 'foldersStructure', sql: v2 },
];