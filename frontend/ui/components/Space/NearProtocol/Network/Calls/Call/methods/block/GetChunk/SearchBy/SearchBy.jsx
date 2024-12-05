import { useWatch } from 'react-hook-form';
import { RadioButton } from '../../../../../../../../../_general/RadioButton/RadioButton.jsx';
import { Input } from '../../../../../../../../../_general/Input/Input.jsx';
import { Tooltip } from '../../../../../../../../../_general/Tooltip/Tooltip.jsx';
import cn from './SearchBy.module.scss';

export const SearchType = ({ form }) => {
  const { control, register } = form;

  const searchType = useWatch({ control, name: 'searchType' });

  return (
    <div className={cn.radioButtons}>
      <div className={cn.container}>
        <p className={cn.tooltipText}>Search</p>
        <Tooltip content="Secarh" placement="top" defaultContent />
      </div>
      <div className={cn.wrapper}>
        <RadioButton register={register} label="By Chunk ID" name="searchType" value="byChunkId" />
        <RadioButton register={register} label="In Block" name="searchType" value="inBlock" />
      </div>
      {searchType === 'byChunkId' && (
        <Input
          name="chunkId"
          control={control}
          label="Chunk Id"
          dynamicErrorSpace
          tooltip={<Tooltip content="Chunk Id" placement="top" defaultContent />}
        />
      )}
      {searchType === 'inBlock' && (
        <>
          <Input
            name="blockId"
            control={control}
            label="Block Id"
            tooltip={<Tooltip content="Block Id" placement="top" defaultContent />}
          />
          <Input
            name="shardId"
            control={control}
            label="Shard Id"
            dynamicErrorSpace
            tooltip={<Tooltip content="Shard Id" placement="top" defaultContent />}
          />
        </>
      )}
    </div>
  );
};
