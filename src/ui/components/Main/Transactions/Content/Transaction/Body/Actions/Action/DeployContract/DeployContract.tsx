import { InputGroup } from '../../../../../../../../general/InputGroup/InputGroup.tsx';

export const DeployContract = ({ form, getName }) => {
  const { register } = form;
  return (
    <InputGroup register={register} name={getName('file')} label="Contract Code" type="file" />
  );
};
