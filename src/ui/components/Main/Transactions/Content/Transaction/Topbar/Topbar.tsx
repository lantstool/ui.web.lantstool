import cn from './Topbar.module.css';
import { SideMenu } from './SideMenu/SideMenu.tsx';

export const Topbar = ({ transaction }: any) => {
  const { transactionId, name } = transaction;

  return (
    <div className={cn.topbar}>
      <h1 className={cn.name}>{name}</h1>
      <div className={cn.sideMenu}>
        <SideMenu transactionId={transactionId} />
      </div>
    </div>
  );
};
