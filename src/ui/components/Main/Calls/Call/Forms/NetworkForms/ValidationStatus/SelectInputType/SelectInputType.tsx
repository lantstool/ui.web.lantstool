import { useWatch } from 'react-hook-form';
import cn from './SelectInputType.module.css';
import { InputGroup } from '../../../../../../../general/InputGroup/InputGroup.jsx';

export const SelectInputType = ({ form }) => {
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
            id="params.type.epoch_id"
            value="epoch_id"
          />
          <label htmlFor="params.type.chunk_id">Epoch Id</label>
          <input
            {...register('params.type')}
            type="radio"
            id="params.type.block_id"
            value="block_id"
          />
          <label htmlFor="params.type.block_id">Block Id</label>
        </div>
      </fieldset>
      {type === 'epoch_id' ? (
        <InputGroup register={register} label="Epoch Id" name="params.epoch_id" />
      ) : (
        <InputGroup register={register} label="Block Id" name="params.block_id" />
      )}
    </>
  );
};
