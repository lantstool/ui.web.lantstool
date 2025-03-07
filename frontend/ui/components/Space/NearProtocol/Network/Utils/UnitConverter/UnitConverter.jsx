import { useForm } from 'react-hook-form';
import { Decimals } from './Decimals/Decimals.jsx';
import { Tokens } from './Tokens/Tokens.jsx';
import { Units } from './Units/Units.jsx';
import cn from './UnitConverter.module.scss';

export const UnitConverter = () => {
  const form = useForm({
    defaultValues: {
      lastOnChange: null,
      tokens: '',
      decimals: '24',
      units: '',
    },
  });

  return (
    <div className={cn.unitConverter}>
      Unit Converter
      <div className={cn.form}>
        <Decimals form={form} />
        <Tokens form={form} />
        <Units form={form} />
      </div>
    </div>
  );
};
