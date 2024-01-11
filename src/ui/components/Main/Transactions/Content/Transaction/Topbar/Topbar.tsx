import cn from './Topbar.module.css';
import { SideMenu } from './SideMenu/SideMenu.tsx';

const separateData = (transaction: any) => {
  return {
    transactionId: transaction.transactionId,
    name: transaction.name,
  };
};

export const Topbar = ({ transaction }: any) => {
  const getFormData = separateData(transaction);
  const { transactionId, name } = getFormData;

  return (
    <div className={cn.topbar}>
      <h1 className={cn.name}>{name}</h1>
      <div className={cn.sideMenu}>
        <SideMenu transactionId={transactionId} />
      </div>
    </div>
  );
};
