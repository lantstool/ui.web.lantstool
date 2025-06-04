import { Items } from './Items/Items.jsx';
import cn from './KeyList.module.scss';

export const KeyList = ({ keys, type, name }) => {
  if (keys.length === 0) return;

  return (
    <div className={cn.container}>
      <h2 className={cn.title}>{name}</h2>
      {keys.map((key) => (
        <Items key={key.publicKey} value={key} keys={keys} type={type} />
      ))}
    </div>
  );
};
