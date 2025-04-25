import { action } from '@react-vault';
import { set } from 'lodash';

export const mount = action(({ slice, payload }) => {
  const { spaceId, networkId } = payload;

  set(slice, [spaceId, networkId], {
    step: 'form',
    // step: 'operation-progress',
    // formValues: {
    //   signerId: null,
    //   signerKey: null,
    //   mode: 'deleteAccount',
    //   beneficiaryId: null,
    // },
    formValues: {
      signerId: {
        value: 'account-cleaner.lantstool.near',
        label: 'account-cleaner.lantstool.near',
      },
      signerKey: {
        value: 'ed25519:FWpYPfQf9Kw2CMFiKAaTWReAiYvSnZHCEFthV1oMAXPZ',
        label: 'ed25519:FWpYPfQf9Kw2CMFiKAaTWReAiYvSnZHCEFthV1oMAXPZ',
      },
      mode: 'clearContractState',
      beneficiaryId: null,
    },
    operationProgress: {
      status: 'inProgress',
      logs: [],
    },
  });
});
