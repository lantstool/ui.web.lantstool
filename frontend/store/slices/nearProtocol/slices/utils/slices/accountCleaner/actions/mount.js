import { action } from '@react-vault';
import { set } from 'lodash';

export const mount = action(({ slice, payload }) => {
  const { spaceId, networkId } = payload;

  set(slice, [spaceId, networkId], {
    step: 'form',
    formValues: {
      signerId: null,
      signerKey: null,
      mode: 'deleteAccount',
      beneficiaryId: null,
    },
  });
});
