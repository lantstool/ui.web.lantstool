PRAGMA foreign_keys = ON;

BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS spaces (
  spaceId TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  createdAt INTEGER NOT NULL,
  ownerId TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS near_protocol_networks (
  networkId TEXT NOT NULL,
  spaceId TEXT NOT NULL,
  createdAt INTEGER NOT NULL,
  activeRpc TEXT NOT NULL,
  rpcList TEXT NOT NULL,
  PRIMARY KEY (spaceId, networkId),
  FOREIGN KEY (spaceId)
    REFERENCES spaces(spaceId)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS near_protocol_transactions (
  transactionId TEXT PRIMARY KEY,
  networkId TEXT NOT NULL,
  spaceId TEXT NOT NULL,
  name TEXT NOT NULL,
  "order" INTEGER UNIQUE NOT NULL,
  createdAt INTEGER NOT NULL,
  body TEXT NOT NULL,
  FOREIGN KEY (spaceId, networkId)
    REFERENCES near_protocol_networks(spaceId, networkId)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS near_protocol_counters (
  spaceId TEXT NOT NULL,
  networkId TEXT NOT NULL,
  transactions INTEGER NOT NULL,
  calls INTEGER NOT NULL,
  FOREIGN KEY (spaceId, networkId)
    REFERENCES near_protocol_networks(spaceId, networkId)
    ON DELETE CASCADE
);

COMMIT;
