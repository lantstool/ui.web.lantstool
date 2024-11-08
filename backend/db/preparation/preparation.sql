PRAGMA foreign_keys = ON;

BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS spaces (
  spaceId TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  badge TEXT NOT NULL,
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
  "order" INTEGER NOT NULL,
  createdAt INTEGER NOT NULL,
  body TEXT NOT NULL,
  FOREIGN KEY (spaceId, networkId)
    REFERENCES near_protocol_networks(spaceId, networkId)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS near_protocol_calls (
  callId TEXT PRIMARY KEY,
  networkId TEXT NOT NULL,
  spaceId TEXT NOT NULL,
  name TEXT NOT NULL,
  "order" INTEGER NOT NULL,
  createdAt INTEGER NOT NULL,
  body TEXT NOT NULL,
  FOREIGN KEY (spaceId, networkId)
    REFERENCES near_protocol_networks(spaceId, networkId)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS near_protocol_accounts (
  accountId TEXT NOT NULL,
  networkId TEXT NOT NULL,
  spaceId TEXT NOT NULL,
  note TEXT,
  createdAt INTEGER NOT NULL,
  PRIMARY KEY (spaceId, networkId, accountId),
  FOREIGN KEY (spaceId, networkId)
    REFERENCES near_protocol_networks(spaceId, networkId)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS near_protocol_keys (
  publicKey TEXT NOT NULL,
  networkId TEXT NOT NULL,
  spaceId TEXT NOT NULL,
  createdAt INTEGER NOT NULL,
  privateKey TEXT NOT NULL,
  seedPhrase TEXT,
  derivationPath TEXT,
  PRIMARY KEY (spaceId, networkId, publicKey),
  FOREIGN KEY (spaceId, networkId)
    REFERENCES near_protocol_networks(spaceId, networkId)
    ON DELETE CASCADE
);

/*
  We need this table only for manage transactions / calls names - when user create
  a new tx/call we show the default name - Transaction#[counter + 1]
  Call#[counter + 1]
 */
CREATE TABLE IF NOT EXISTS near_protocol_counters (
  spaceId TEXT NOT NULL,
  networkId TEXT NOT NULL,
  transactions INTEGER NOT NULL,
  calls INTEGER NOT NULL,
  PRIMARY KEY (spaceId, networkId),
  FOREIGN KEY (spaceId, networkId)
    REFERENCES near_protocol_networks(spaceId, networkId)
    ON DELETE CASCADE
);

COMMIT;
