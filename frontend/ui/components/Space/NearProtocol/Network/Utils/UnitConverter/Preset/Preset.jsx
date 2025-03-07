import { useCallback } from 'react';
import { useController } from 'react-hook-form';
import { onChange as decimalsOnChange } from '../Decimals/onChange.js';
import { Item } from './Item/Item.jsx';
import cn from './Preset.module.scss';

export const Preset = ({ form }) => {
  const { field } = useController({ name: 'decimals', control: form.control });
  const currentDecimals = form.watch('decimals');
  const setDecimals = useCallback((value) => decimalsOnChange(form)(field)(String(value)), []);

  return (
    <div className={cn.preset}>
      <Item
        decimals="24"
        label="NEAR"
        currentDecimals={currentDecimals}
        setDecimals={setDecimals}
      />
      <Item
        decimals="8"
        label="BTC"
        currentDecimals={currentDecimals}
        setDecimals={setDecimals}
      />
      <Item
        decimals="18"
        label="ETH"
        currentDecimals={currentDecimals}
        setDecimals={setDecimals}
      />
      <Item
        decimals="9"
        label="SOL"
        currentDecimals={currentDecimals}
        setDecimals={setDecimals}
      />
      <Item
        decimals="8"
        label="APT"
        currentDecimals={currentDecimals}
        setDecimals={setDecimals}
      />
      <Item
        decimals="9"
        label="SUI"
        currentDecimals={currentDecimals}
        setDecimals={setDecimals}
      />
      <Item
        decimals="6"
        label="USDT"
        currentDecimals={currentDecimals}
        setDecimals={setDecimals}
      />
      <Item
        decimals="6"
        label="USDC"
        currentDecimals={currentDecimals}
        setDecimals={setDecimals}
      />
    </div>
  );
};
