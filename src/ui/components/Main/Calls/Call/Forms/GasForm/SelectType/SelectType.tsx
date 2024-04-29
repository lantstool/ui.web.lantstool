import cn from '../../general/SelectSearchType/SelectSearchType.module.css';
import { InputGroup } from '../../../../../../general/InputGroup/InputGroup.tsx';
import { useWatch } from 'react-hook-form';

export const SelectType = ({ form }: any) => {
  const { register, control } = form;

  const type = useWatch({
    control,
    name: 'params.type',
  });

  return (
    <>
      <fieldset className={cn.container}>
        <legend className={cn.label}>Type</legend>
        <div>
          <input {...register('params.type')} type="radio" id="params.type.block" value="block" />
          <label htmlFor="params.type.block">Block</label>
          <input
            {...register('params.type')}
            type="radio"
            id="params.type.lastBlock"
            value="lastBlock"
          />
          <label htmlFor="params.type.lastBlock">Last block</label>
        </div>
      </fieldset>
      {type === 'block' && (
        <InputGroup register={register} label="Block - Height / Hash" name="params.block" />
      )}
    </>
  );
};
