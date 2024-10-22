import { useWatch } from 'react-hook-form';
import cn from './SelectInputType.module.scss';
import { InputGroup } from '../../../../../../../../../_general/InputGroup/InputGroup.jsx';

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
            id="params.type.chunk_id"
            value="chunk_id"
          />
          <label htmlFor="params.type.chunk_id">Chunk Id</label>
          <input
            {...register('params.type')}
            type="radio"
            id="params.type.block_id"
            value="block_id"
          />
          <label htmlFor="params.type.block_id">Block Id / Shard Id</label>
        </div>
      </fieldset>
      {type === 'chunk_id' ? (
        <InputGroup register={register} label="Chunk Id" name="params.chunk_id" />
      ) : (
        <>
          <InputGroup register={register} label="Block Id" name="params.block_id" />
          <InputGroup register={register} label="Shard Id" name="params.shard_id" />
        </>
      )}
    </>
  );
};
