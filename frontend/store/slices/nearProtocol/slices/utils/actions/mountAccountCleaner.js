import { action } from '@react-vault';
import { set } from 'lodash';

export const mountAccountCleaner = action(({ slice, payload }) => {
  const { spaceId, networkId } = payload;

  set(slice, ['accountCleaner', spaceId, networkId], {
    formValues: {
      signerId: null,
      signerKey: null,
      mode: 'clearContractState',
      beneficiaryId: null,
    },
    step: 'filling-form',
  });
});


/*
signerId: {
        value: 'nyc-neardrop.near',
        label: 'nyc-neardrop.near',
      },
      signerKey: {
        value: 'ed25519:3YWiXfJ7QpnaFXBBCBH7Sy2cbfTvkrt84D6ABexS9GCi',
        label: 'ed25519:3YWiXfJ7QpnaFXBBCBH7Sy2cbfTvkrt84D6ABexS9GCi',
      },
      mode: 'clearContractState',
      beneficiaryId: {
        value: 'eclipseeer.near',
        label: 'eclipseeer.near',
      },
 */
