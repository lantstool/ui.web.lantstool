import { useStoreEffect } from '../../../../react-vault/index.js';

export const CreateSpace = () => {
  const create = useStoreEffect((store) => store.spaces.create);

  return (
    <div>
      <h1>CreateSpace</h1>
      <div>
        <button onClick={create}>Create Space</button>
      </div>
    </div>
  );
};
