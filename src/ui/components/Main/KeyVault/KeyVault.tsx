import cn from './KeyVault.module.css';
import { useStoreEffect } from "../../../../react-vault";
import { useEffect } from "react";

export const KeyVault = () =>  {
  const getKeys = useStoreEffect((store) => store.keyVault.getKeys);
  const addKey = useStoreEffect((store) => store.keyVault.addKey);

  useEffect(() => {
    getKeys();
  }, []);

  return (
    <div className={cn.container}>
      KeyVault
      <button type="button" onClick={addKey}>Add Key</button>
    </div>
  );
};
