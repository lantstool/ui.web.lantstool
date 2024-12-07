import { useForm, useWatch } from 'react-hook-form';
import { ModalFooter } from '../../../../../../../../../_general/modals/ModalFooter/ModalFooter.jsx';
import { Group } from './Group/Group.jsx';
import cn from './SelectPredefined.module.scss';

export const SelectPredefined = ({ network, availablePredefinedRpcs }) => {
  const { control, setValue, handleSubmit } = useForm();

  const selectedRpcId = useWatch({ control, name: 'selectedRpcId' });
  const selectRpc = (rpcId) => setValue('selectedRpcId', rpcId);

  const onSubmit = handleSubmit((formValues) => {
    console.log(network);
    console.log(formValues);
  });

  return (
    <>
      <div className={cn.container}>
        <div className={cn.content}>
          <Group
            list={availablePredefinedRpcs.regular}
            title="Regular"
            selectedRpcId={selectedRpcId}
            selectRpc={selectRpc}
          />
          <Group
            list={availablePredefinedRpcs.archival}
            title="Archival"
            selectedRpcId={selectedRpcId}
            selectRpc={selectRpc}
          />
        </div>
      </div>
      <ModalFooter
        action={{
          label: 'Add',
          onClick: onSubmit,
          disabled: !selectedRpcId,
        }}
        classes={{ container: cn.modalFooter }}
      />
    </>
  );
};
