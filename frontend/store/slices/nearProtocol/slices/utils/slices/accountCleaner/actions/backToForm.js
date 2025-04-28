import { action } from '@react-vault';

export const backToForm = action(({ slice, payload }) => {
  const { spaceId, networkId } = payload;
  const currData = slice[spaceId][networkId];

  slice[spaceId][networkId] = {
    step: 'form',
    formValues: {
      signerId: null,
      signerKey: null,
      mode: currData.formValues.mode,
      beneficiaryId: currData.formValues.beneficiaryId,
    },
    operationProgress: {
      status: 'inProgress',
      logs: [],
    },
  };
});
