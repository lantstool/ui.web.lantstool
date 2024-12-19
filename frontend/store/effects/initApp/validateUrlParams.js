/*
 Here we want to check if URL params entered by user is valid.

 Why? Without this check it's possible to enter invalid spaceId, networkId etc.
 and app will allow to reach this page even if it can't show any info.
 Also, this behavior can cause unknown bugs.

 We call this function only once during the app initialization because this
 situation is only possible when user enter the URL - redirects via the inner
 app navigation can't lead to the wrong pages.
 */

const getRequestType = (params) => {
  if (params.transactionId) return 'nearProtocol.transactions.validateTransactionId';
  if (params.callId) return 'nearProtocol.calls.validateCallId';
  if (params.accountId) return 'nearProtocol.accounts.validateAccountId';
  if (params.publicKey) return 'nearProtocol.keys.validatePublicKey';
  if (params.networkId) return 'nearProtocol.networkIs.validateNetworkId';
  if (params.spaceId) return 'spaces.validateSpaceId';
};

export const validateUrlParams = async (backend, navigate, params) => {
  try {
    const requestType = getRequestType(params);
    // We want to validate only when URL has params
    if (requestType) await backend.sendRequest(requestType, params);
  } catch (e) {
    if (e.code === 404)
      navigate('page-not-found', {
        state: { message: e.message },
        replace: true,
      });
  }
};
