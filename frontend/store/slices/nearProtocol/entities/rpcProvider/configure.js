/*
  if rpcType is 'any' then 'regular' has higher priority than 'archival'
  It means that if we have both regular and archival RPCs then we return the regular list
  even if there is only 1 rpc in the list.
  If there is no regular then we return the archival list.
  We don't want to mix regular and archival.

  We can't have a situation when there are no regular and archival RPCs at all -
  we will always have at least 1 rpc.

  if rpcType is 'regular' or 'archive' then we return the corresponding list. If there are no
  rpc in the list then we throw the error.
*/

const getRegular = (regular) => {
  if (regular.length > 0) return 'regular';
  throw new Error(
    `Unable to send request to the regular RPC - no regular RPCs found. 
     Please add one and try again.`,
  );
};

const getArchival = (archival) => {
  if (archival.length > 0) return 'archival';
  throw new Error(
    `Unable to send request to the archival RPC - no archival RPCs found. 
     Please add one and try again.`,
  );
};

const getAny = (regular, archive) => {
  if (regular.length > 0) return 'regular';
  if (archive.length > 0) return 'archival';
  throw new Error(`Unable to send request - no RPCs found. Please add one and try again.`);
};

const getType = (rpcType, rpcList) => {
  const { regular, archival } = rpcList;
  if (rpcType === 'regular') return getRegular(regular);
  if (rpcType === 'archival') return getArchival(archival);
  if (rpcType === 'any') return getAny(regular, archival);
};

export async function configure({ spaceId, networkId, rpcType = 'any' }) {
  const [backend] = this.store.getEntities((store) => store.backend);
  const setNotification = this.store.getActions((store) => store.setNotification);

  try {
    const { activeRpc, rpcList } = await backend.sendRequest('nearProtocol.networks.getRpcData', {
      spaceId,
      networkId,
    });

    const type = getType(rpcType, rpcList);
    // On this stage activeRpc will be always valid
    const isAutoBalance = activeRpc[type].autoBalance;
    // To avoid an unnecessary logic we return an array of 1 element when isAutoBalance is false -
    // and get random rpc function will always return this particular rpc.
    this.rpcs = isAutoBalance ? rpcList[type] : [activeRpc[type].rpc];
  } catch (e) {
    console.log(e);
    setNotification({ isOpen: true, message: e.message, variant: 'error', delay: 2500 });
  }
}
