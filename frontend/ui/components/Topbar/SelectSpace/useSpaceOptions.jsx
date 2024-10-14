import { useStoreState } from '../../../../../react-vault/index.js';
import { useMemo } from 'react';

const getOptions = (ids, records) =>
  ids.map((spaceId) => ({
    label: records[spaceId].name,
    value: records[spaceId].spaceId,
    spaceId: records[spaceId].spaceId,
  }));

export const useSpaceOptions = () => {
  const ids = useStoreState((store) => store.spaces.ids);
  const records = useStoreState((store) => store.spaces.records);

  return useMemo(() => {
    const options = getOptions(ids, records);
    return [...options, { label: 'Manage Spaces', value: 'manageSpaces' }];
  }, [ids, records]);
};
