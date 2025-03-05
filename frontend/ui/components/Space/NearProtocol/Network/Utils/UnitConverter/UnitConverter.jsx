import { useForm, useWatch } from 'react-hook-form';
import { FormInput } from '@gc/input/FormInput/FormInput.jsx';
import { FormDropdown } from '@gc/dropdown/FormDropdown.jsx';
import { unitToToken } from './formatters/unitToToken.js';
import { tokenToUnit } from './formatters/tokenToUnit.js';
import { useConversion } from './useConversion.js';
import cn from './UnitConverter.module.scss';

const options = Array.from({ length: 24 }, (_, i) => ({
  value: String(i + 1),
  label: String(i + 1),
}));

export const UnitConverter = () => {
  const { control, setValue } = useForm({
    defaultValues: {
      tokens: '',
      decimals: { value: '24', label: '24' },
      units: '',
    },
  });

  const tokens = useWatch({ control, name: 'tokens' });
  const units = useWatch({ control, name: 'units' });
  const decimals = useWatch({ control, name: 'decimals' });

  // useConversion(tokens, 'units', tokenToUnit, setValue, decimals);
  useConversion(units, 'tokens', unitToToken, setValue, decimals);

  return (
    <div className={cn.unitConverter}>
      Unit Converter
      <div className={cn.form}>
        <FormInput control={control} name="tokens" label="Tokens" placeholder="1" />
        <div className={cn.decimals}>
          <FormDropdown
            control={control}
            name="decimals"
            label="Decimals"
            options={options}
            copy={false}
          />
        </div>
        <FormInput
          control={control}
          name="units"
          label="Units"
          placeholder="100000000000000000000000"
        />
      </div>
    </div>
  );
};
