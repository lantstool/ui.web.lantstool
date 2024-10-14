// SQLite won't allow us to insert the string with apostrophe like m/44'/397'/0' -
// we have to replace it with something else, for example - `
const derivationPath = {
  serialize: (path) => path.replaceAll("'", '`'),
  deserialize: (path) => path.replaceAll('`', "'"),
};

export const utils = {
  derivationPath,
}
