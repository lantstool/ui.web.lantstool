import { InputGroup } from '../../../../general/InputGroup/InputGroup.tsx';
import { useWatch } from 'react-hook-form';

export const To = ({ form }: any) => {
  const { register, control } = form;

  const actions = useWatch({
    control: form.control,
    name: 'actions',
  });

  if (actions.length === 0) return null;

  return (
    <fieldset style={{ borderRadius: 8, margin: '20px 0', }}>
      <legend>To</legend>
      <InputGroup register={register} name="receiver.accountId" label="Receiver Id" />
    </fieldset>
  );
};
