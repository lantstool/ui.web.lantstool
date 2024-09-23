PRAGMA foreign_keys = ON;

BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS spaces (
  spaceId TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  createdAt INTEGER NOT NULL,
  ownerId TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS near_networks (
  networkId TEXT NOT NULL,
  spaceId TEXT NOT NULL,
  createdAt INTEGER NOT NULL,
  rpc TEXT NOT NULL,
  rpcList TEXT NOT NULL,
  PRIMARY KEY (networkId, spaceId),
  FOREIGN KEY (spaceId) REFERENCES spaces(spaceId)
);

COMMIT;
