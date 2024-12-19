const getType = (priority, rpcList) => {
  if (rpcList[priority[0]].length > 0) return priority[0];
  if (rpcList[priority[1]].length > 0) return priority[1];
  throw new Error(`Unable to send request - no RPCs found. Please add one and try again.`);
};

export async function configure({ spaceId, networkId, priority = ['regular', 'archival'] }) {
  const [backend] = this.store.getEntities((store) => store.backend);
  const setNotification = this.store.getActions((store) => store.setNotification);

  try {
    const { activeRpc, rpcList } = await backend.sendRequest('nearProtocol.networks.getRpcData', {
      spaceId,
      networkId,
    });

    const type = getType(priority, rpcList);
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
