import { useWatch } from 'react-hook-form';
import { FormRadioButton } from '../../../../../../../../../_general/FormRadioButton/FormRadioButton.jsx';
import { FormInput } from '../../../../../../../../../_general/input/FormInput/FormInput.jsx';
import { Tooltip } from '../../../../../../../../../_general/Tooltip/Tooltip.jsx';
import cn from './SearchBy.module.scss';

export const SearchBy = ({ form }) => {
  const { control } = form;

  const searchType = useWatch({ control, name: 'searchType' });

  return (
    <div className={cn.radioButtons}>
      <div className={cn.container}>
        <p className={cn.tooltipText}>Search</p>
        <Tooltip content="Secarh" placement="top" defaultContent />
      </div>
      <div className={cn.wrapper}>
        <FormRadioButton
          control={control}
          label="By Chunk ID"
          name="searchType"
          value="byChunkId"
        />
        <FormRadioButton control={control} label="In Block" name="searchType" value="inBlock" />
      </div>
      {searchType === 'byChunkId' && (
        <FormInput
          name="chunkId"
          control={control}
          label="Chunk Id"
          dynamicErrorSpace
          tooltip={<Tooltip content="Chunk Id" placement="top" defaultContent />}
        />
      )}
      {searchType === 'inBlock' && (
        <div className={cn.blockWrapper}>
          <FormInput
            name="blockId"
            control={control}
            label="Block Id"
            tooltip={<Tooltip content="Block Id" placement="top" defaultContent />}
          />
          <FormInput
            name="shardId"
            control={control}
            label="Shard Id"
            dynamicErrorSpace
            tooltip={<Tooltip content="Shard Id" placement="top" defaultContent />}
          />
        </div>
      )}
    </div>
  );
};
