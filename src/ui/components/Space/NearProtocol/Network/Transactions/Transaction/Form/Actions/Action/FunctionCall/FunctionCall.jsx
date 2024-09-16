import { InputGroup } from '../../../../../../../../../general/InputGroup/InputGroup.jsx';
import { Arguments } from './Arguments/Arguments.jsx';

export const FunctionCall = ({ form, getName }) => {
  const { register } = form;
  return (
    <>
      <InputGroup register={register} name={getName('methodName')} label="Method Name" />
      <Arguments form={form} name={getName('arguments')} />
      <InputGroup register={register} name={getName('gas')} label="Gas (Tgas)" />
      <InputGroup register={register} name={getName('deposit')} label="Deposit (NEAR)" />
    </>
  );
};
