import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStoreEffect } from '@react-vault';

export const useKeysOptions = () => {
  const { spaceId, networkId } = useParams();
  const [options, setOptions] = useState([]);
  const getKeyList = useStoreEffect((store) => store.nearProtocol.keys.getKeyList);

  useEffect(() => {
    (async () => {
      try {
        const keyList = await getKeyList({ spaceId, networkId });
        const options = keyList.map((key) => ({
          value: key.publicKey,
          label: key.publicKey,
        }));
        setOptions(options);
      } catch (e) {
        setOptions([]);
      }
    })();
  }, []);

  return options;
};
