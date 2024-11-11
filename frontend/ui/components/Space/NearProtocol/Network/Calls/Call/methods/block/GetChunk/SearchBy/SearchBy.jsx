import { useWatch } from 'react-hook-form';
import { RadioButton } from '../../../../../../../../../_general/RadioButton/RadioButton.jsx';
import { Input } from '../../../../../../../../../_general/Input/Input.jsx';
import cn from './SearchBy.module.scss';

export const SearchType = ({ form }) => {
  const { control, register } = form;

  const searchType = useWatch({ control, name: 'searchType' });

  return (
    <>
      <div className={cn.radioButtons}>
        <p>Search:</p>
        <RadioButton register={register} label="By Chunk ID" name="searchType" value="byChunkId" />
        <RadioButton register={register} label="In Block" name="searchType" value="inBlock" />
      </div>
      {searchType === 'byChunkId' && <Input name="chunkId" control={control} label="Chunk Id" />}
      {searchType === 'inBlock' && (
        <>
          <Input name="blockId" control={control} label="Block Id" />
          <Input name="shardId" control={control} label="Shard Id" />
        </>
      )}
    </>
  );
};
