export const extractContracts = (body) => {
  /**
   *  Count how much contracts occurs in actions. For example:
   *  [{ a: 1 }, { b: 2 }]
   */
  const contracts = body.actions
    .filter((action) => action.type === 'DeployContract' && action.fileName && action.base64File)
    .reduce((acc, { fileName, base64File }) => {
      if (acc[fileName]) {
        acc[fileName].counter += 1;
        return acc;
      }

      const buffer = Buffer.from(base64File, 'base64');
      const u8File = new Uint8Array(buffer);
      acc[fileName] = { counter: 1, u8File };

      return acc;
    }, {});

  // remove base64File from the actions
  body.actions = body.actions.map((action) =>
    action.type === 'DeployContract'
      ? {
          type: action.type,
          fileName: action.fileName,
        }
      : action,
  );

  return {
    contracts,
    bodyWithoutBase64Files: body,
  };
};
