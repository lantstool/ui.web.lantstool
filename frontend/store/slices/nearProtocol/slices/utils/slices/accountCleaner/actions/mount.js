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
        value: 'miami-neardrop.near',
        label: 'miami-neardrop.near',
      },
      signerKey: {
        value: 'ed25519:3YWiXfJ7QpnaFXBBCBH7Sy2cbfTvkrt84D6ABexS9GCi',
        label: 'ed25519:3YWiXfJ7QpnaFXBBCBH7Sy2cbfTvkrt84D6ABexS9GCi',
      },
      mode: 'clearContractState',
      beneficiaryId: null,
    },
    operationProgress: {
      status: 'inProgress',
      logs: [
        {
          type: 'info',
          message: 'Fetching contract state keys…',
          timestamp: 1713853700000,
        },
        {
          type: 'info',
          message: 'Found 27 keys in contract state.',
          timestamp: 1713853701000,
        },
        {
          type: 'info',
          message: 'Clearing key: storage:profile',
          timestamp: 1713853702000,
        },
        {
          type: 'info',
          message: 'Key "storage:profile" deleted successfully.',
          timestamp: 1713853702500,
        },
        {
          type: 'error',
          message:
            'Failed to delete key "storage:settings": Access denied.\n          Failed to delete key storage:settings: Access denied.\n          ',
          timestamp: 1713853703000,
        },
        {
          type: 'success',
          message: 'Contract state cleanup completed with 1 error.',
          timestamp: 1713853704000,
        },
        {
          type: 'info',
          message: 'Complete request: 1',
          timestamp: 1745404325323,
        },
        {
          type: 'info',
          message: 'Complete request: 2',
          timestamp: 1745404326326,
        },
        {
          type: 'info',
          message: 'Complete request: 3',
          timestamp: 1745404327329,
        },
        {
          type: 'info',
          message: 'Complete request: 4',
          timestamp: 1745404328332,
        },
        {
          type: 'info',
          message: 'Complete request: 5',
          timestamp: 1745404329335,
        },
        {
          type: 'info',
          message: 'Complete request: 6',
          timestamp: 1745404330337,
        },
        {
          type: 'info',
          message: 'Complete request: 7',
          timestamp: 1745404331340,
        },
        {
          type: 'info',
          message: 'Complete request: 8',
          timestamp: 1745404332410,
        },
        {
          type: 'info',
          message: 'Complete request: 9',
          timestamp: 1745404333412,
        },
        {
          type: 'info',
          message: 'Complete request: 10',
          timestamp: 1745404334417,
        },
        {
          type: 'info',
          message: 'Complete request: 11',
          timestamp: 1745404335420,
        },
        {
          type: 'info',
          message: 'Complete request: 12',
          timestamp: 1745404336422,
        },
      ],
    },
  });
});
