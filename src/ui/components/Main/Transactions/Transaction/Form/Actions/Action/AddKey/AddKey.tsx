import { useWatch } from 'react-hook-form';
import { InputGroup } from '../../../../../../../general/InputGroup/InputGroup.jsx';
import { FunctionCall } from './FunctionCall/FunctionCall.tsx';

export const AddKey = ({ form, getName }: any) => {
  const { control, register } = form;
  const permissionName = getName('permission.type');

  const permissionType = useWatch({
    control,
    name: permissionName,
  });

  return (
    <>
      <InputGroup register={register} name={getName('publicKey')} label="New Public Key" />
      <InputGroup register={register} name={getName('nonce')} label="Nonce" />

      <fieldset style={{ borderRadius: 8 }}>
        <legend>Permission</legend>

        <input
          {...register(permissionName)}
          type="radio"
          id={`${permissionName}.fullAccess`}
          value="FullAccess"
        />
        <label htmlFor={`${permissionName}.fullAccess`}>Full Access</label>

        <input
          {...register(permissionName)}
          type="radio"
          id={`${permissionName}.functionCall`}
          value="FunctionCall"
        />
        <label htmlFor={`${permissionName}.functionCall`}>Function Call</label>
      </fieldset>

      {permissionType === 'FunctionCall' && <FunctionCall form={form} getName={getName} />}
    </>
  );
};
