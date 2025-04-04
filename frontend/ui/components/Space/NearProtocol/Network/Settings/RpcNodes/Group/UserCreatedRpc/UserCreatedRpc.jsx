import { Menu } from './Menu/Menu.jsx';
import { SelectButton } from '../../_general/SelectButton/SelectButton.jsx';
import defaultRpcLogo from '@assets/logos/default-rpc-logo.png';
import cn from './UserCreatedRpc.module.scss';

export const UserCreatedRpc = ({
  rpc,
  groupActiveRpc,
  rpcType,
  spaceId,
  networkId,
  updateActiveRpc,
  isLastRpcInList,
}) => {
  const isSelected = groupActiveRpc.rpc?.id === rpc.id;

  const select = () => {
    if (isSelected) return;
    updateActiveRpc({ spaceId, networkId, rpcType, autoBalance: false, rpc });
  };

  return (
    <div className={cn.rpc}>
      <div className={cn.selectButtonWrapper}>
        <SelectButton isSelected={isSelected} select={select} />
      </div>
      <img src={defaultRpcLogo} alt={`${rpc.name} logo`} className={cn.logo} />
      <div className={cn.nameUrl}>
        <h3 className={cn.name}>{rpc.name}</h3>
        <span className={cn.url}>{rpc.url}</span>
      </div>
      <Menu
        rpc={rpc}
        rpcType={rpcType}
        spaceId={spaceId}
        networkId={networkId}
        isLastRpcInList={isLastRpcInList}
      />
    </div>
  );
};
