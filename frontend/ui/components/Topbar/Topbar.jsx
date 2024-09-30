import { SelectSpace } from './SelectSpace/SelectSpace.jsx';
import { SelectBlockchain } from './SelectBlockchain/SelectBlockchain.jsx';
import { SelectNearNetwork } from './SelectNearNetwork/SelectNearNetwork.jsx';
import cn from './Topbar.module.scss';

export const Topbar = () => {
  return (
    <div className={cn.topbar}>
      <SelectSpace />
      <SelectBlockchain />
      <SelectNearNetwork />
    </div>
  );
};
