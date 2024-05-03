import { InputGroup } from '../../../../../../general/InputGroup/InputGroup.jsx';
import { useWatch } from 'react-hook-form';
import cn from './SelectSearchType.module.css';

export const SelectSearchType = ({ form }) => {
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
          <input
            {...register('params.type')}
            type="radio"
            id="params.type.finality"
            value="finality"
          />
          <label htmlFor="params.type.finality">Finality</label>
          <input
            {...register('params.type')}
            type="radio"
            id="params.type.block_id"
            value="block_id"
          />
          <label htmlFor="params.type.block_id">Block Id</label>
        </div>
      </fieldset>
      {type === 'block_id' && (
        <InputGroup register={register} label="Block Id" name="params.block_id" />
      )}
    </>
  );
};
