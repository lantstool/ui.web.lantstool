import { InputGroup } from '../../../../../general/InputGroup/InputGroup.tsx';
import { NewImplicitAccount } from './NewImplicitAccount/NewImplicitAccount.js';
import { useWatch } from 'react-hook-form';

export const To = ({ form }: any) => {
  const { register, control } = form;

  const actions = useWatch({
    control,
    name: 'actions',
  });

  const type = useWatch({
    control,
    name: 'receiver.type',
  });

  if (actions.length === 0) return null;

  return (
    <fieldset style={{ borderRadius: 8, margin: '20px 0' }}>
      <legend>Receiver</legend>

      <div>
        <input
          {...register('receiver.type')}
          type="radio"
          id="receiver.type.existing"
          value="existing"
        />
        <label htmlFor="receiver.type.existing">Existing Account</label>
      </div>

      <div>
        <input
          {...register('receiver.type')}
          type="radio"
          id="receiver.type.newNamed"
          value="newNamed"
        />
        <label htmlFor="receiver.type.newNamed">New Named Account</label>
      </div>
      <div>
        <input
          {...register('receiver.type')}
          type="radio"
          id="receiver.type.newImplicit"
          value="newImplicit"
        />
        <label htmlFor="receiver.type.newImplicit">New Implicit Account</label>
      </div>

      {type === 'existing' && (
        <InputGroup
          register={register}
          name="receiver.existing.accountId"
          label="Existing Account Id"
        />
      )}

      {type === 'newNamed' && (
        <InputGroup
          register={register}
          name="receiver.newNamed.accountId"
          label="New Named Account Id"
        />
      )}

      {type === 'newImplicit' && <NewImplicitAccount form={form} />}
    </fieldset>
  );
};
