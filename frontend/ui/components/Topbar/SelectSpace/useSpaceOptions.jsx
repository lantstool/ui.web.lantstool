import { useStoreState } from '@react-vault';
import { useMemo } from 'react';

const getOptions = (ids, records) =>
  ids.map((spaceId) => ({
    label: records[spaceId].name,
    value: records[spaceId].spaceId,
  }));

const getDefaultValue = (options, spaceId) => options.find((option) => option.value === spaceId);

export const useSpaceOptions = (spaceId) => {
  const ids = useStoreState((store) => store.spaces.ids);
  const records = useStoreState((store) => store.spaces.records);

  return useMemo(() => {
    const options = getOptions(ids, records);
    const defaultValue = getDefaultValue(options, spaceId);
    return {
      defaultValue,
      options: [...options, { label: 'Manage Spaces', value: 'manageSpaces' }],
    };
  }, [ids, records, spaceId]);
};
