import { useSaveToHistory } from '@hooks/useSaveToHistory.js';
import { useStoreAction, useStoreState } from '@react-vault';
import { get } from 'lodash';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Decimals } from './Decimals/Decimals.jsx';
import { Tokens } from './Tokens/Tokens.jsx';
import { Units } from './Units/Units.jsx';
import { Preset } from './Preset/Preset.jsx';
import cn from './UnitConverter.module.scss';

const getDefaultValues = (unitConverter, spaceId, networkId) =>
  get(unitConverter, [spaceId, networkId], {
    lastOnChange: null,
    tokens: '',
    decimals: '24',
    units: '',
  });

export const UnitConverter = () => {
  const { spaceId, networkId } = useParams();
  const unitConverter = useStoreState((state) => state.nearProtocol.utils.unitConverter);
  const setUnitConverterValues = useStoreAction(
    (store) => store.nearProtocol.utils.setUnitConverterValues,
  );

  const form = useForm({ defaultValues: getDefaultValues(unitConverter, spaceId, networkId) });

  useSaveToHistory();

  useEffect(() => {
    form.reset(getDefaultValues(unitConverter, spaceId, networkId));
    return () => setUnitConverterValues({ spaceId, networkId, formValues: form.getValues() });
  }, [spaceId, networkId]);

  return (
    <div className={cn.unitConverter}>
      <Preset form={form} />
      <div className={cn.form}>
        <Decimals form={form} />
        <Tokens form={form} />
        <Units form={form} />
      </div>
    </div>
  );
};
