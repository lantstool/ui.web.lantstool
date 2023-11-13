import { useWatch } from 'react-hook-form';
import { InputGroup } from '../../../../../../general/InputGroup/InputGroup.tsx';

export const Transfer = ({ form, getName }: any) => {
  const { register } = form;

  return <InputGroup register={register} name={getName('amount')} label="Amount" />;
};
