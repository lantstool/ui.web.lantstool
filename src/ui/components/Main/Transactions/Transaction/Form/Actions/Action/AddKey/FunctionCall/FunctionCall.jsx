import { InputGroup } from '../../../../../../../../general/InputGroup/InputGroup.jsx';
import { Allowance } from './Allowance/Allowance.jsx';
import { AllowedMethods } from './AllowedMethods/AllowedMethods.jsx';

export const FunctionCall = ({ form, getName }) => {
  return (
    <>
      <Allowance form={form} getName={getName} />
      <InputGroup
        register={form.register}
        name={getName('permission.restrictions.receiverId')}
        label="Contact Id"
      />
      <AllowedMethods form={form} getName={getName} />
    </>
  );
};
