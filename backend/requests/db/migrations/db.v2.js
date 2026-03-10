export const v2 = `
  ALTER TABLE near_protocol_transactions ADD COLUMN parentId TEXT;
  ALTER TABLE near_protocol_calls ADD COLUMN parentId TEXT;

  CREATE TABLE IF NOT EXISTS near_protocol_folders (
    folderId TEXT PRIMARY KEY,
    networkId TEXT NOT NULL,
    spaceId TEXT NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    collapsed INTEGER,
    FOREIGN KEY (spaceId, networkId)
      REFERENCES near_protocol_networks(spaceId, networkId) ON DELETE CASCADE
  );
`;