import { useStoreEffect } from '@react-vault';
import { useForm, useWatch } from 'react-hook-form';
import { ModalFooter } from '../../../../../../../../../_general/modals/ModalFooter/ModalFooter.jsx';
import { Group } from './Group/Group.jsx';
import cn from './SelectPredefined.module.scss';

export const SelectPredefined = ({ network, availablePredefinedRpcs, close }) => {
  const addPredefinedRpc = useStoreEffect((store) => store.nearProtocol.networks.addPredefinedRpc);
  const { control, setValue, handleSubmit } = useForm();

  const selectedRpc = useWatch({ control, name: 'selectedRpc' });

  const selectRpc = (rpc, rpcType) => {
    setValue('selectedRpc', rpc);
    setValue('rpcType', rpcType);
  };

  const onSubmit = handleSubmit((formValues) => {
    addPredefinedRpc({ network, formValues, close });
  });

  return (
    <>
      <div className={cn.container}>
        <div className={cn.content}>
          <Group
            list={availablePredefinedRpcs.regular}
            title="Regular"
            selectedRpc={selectedRpc}
            selectRpc={selectRpc}
            rpcType="regular"
          />
          <Group
            list={availablePredefinedRpcs.archival}
            title="Archival"
            selectedRpc={selectedRpc}
            selectRpc={selectRpc}
            rpcType="archival"
          />
        </div>
      </div>
      <ModalFooter
        action={{
          label: 'Add',
          onClick: onSubmit,
          disabled: !selectedRpc,
        }}
        classes={{ container: cn.modalFooter }}
      />
    </>
  );
};
