import { InputGroup } from '../../../../../../../../../_general/InputGroup/InputGroup.jsx';

export const DeployContract = ({ form, getName }) => {
  const { register } = form;
  return (
    <InputGroup register={register} name={getName('file')} label="Contract Code" type="file" />
  );
};
