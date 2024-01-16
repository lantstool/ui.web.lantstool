import { InputGroup } from '../../../../../../../../general/InputGroup/InputGroup.tsx';

export const DeleteAccount = ({ form, getName }: any) => {
  const { register } = form;
  return <InputGroup register={register} name={getName('deleteAccount')} label="Delete Account" />;
};
