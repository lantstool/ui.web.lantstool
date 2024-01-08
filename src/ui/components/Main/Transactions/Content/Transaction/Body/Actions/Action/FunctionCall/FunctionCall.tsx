import { InputGroup } from '../../../../../../../../general/InputGroup/InputGroup.tsx';

export const FunctionCall = ({ form, getName }: any) => {
  const { register } = form;

  return (
    <>
      <InputGroup register={register} name={getName('methodName')} label="Method Name" />
      <InputGroup
        register={register}
        name={getName('arguments')}
        label="Arguments"
        textarea
        rows={10}
      />
      <InputGroup register={register} name={getName('gas')} label="Gas (Tgas)" />
      <InputGroup register={register} name={getName('deposit')} label="Deposit (NEAR)" />
    </>
  );
};
