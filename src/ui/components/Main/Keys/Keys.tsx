import cn from './Keys.module.css';
import { useStoreEffect } from "../../../../react-vault";
import { useEffect } from "react";

export const Keys = () =>  {
  const getKeys = useStoreEffect((store) => store.keys.getKeys);
  const addKey = useStoreEffect((store) => store.keys.addKey);

  useEffect(() => {
    getKeys();
  }, []);

  return (
    <div className={cn.container}>
      KeyVault
      <div>
        <button type="button" onClick={addKey}>Add Key</button>
      </div>
    </div>
  );
};
