import cn from './Topbar.module.css';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useStoreState, useStoreAction } from '../../../react-vault';

export const Topbar = () => {
  const network = useStoreState((store: any) => store.network);
  const setNetwork = useStoreAction((store: any) => store.setNetwork);

  const onClick = () => {
    setNetwork(network === 'mainnet' ? 'testnet' : 'mainnet');
  };

  return (
    <div className={cn.container}>
      <h3>Topbar - network - {network}</h3>
      <button onClick={onClick}>Toggle network</button>
    </div>
  );
};
