import cn from './Topbar.module.css';
import { useStoreState } from '../../../../../../../react-vault';
import { useNavigate } from 'react-router-dom';
import { SideMenu } from './SideMenu/SideMenu.tsx';

export const Topbar = ({ form }: any) => {
  const navigate = useNavigate();

  const { getValues } = form;
  const { transactionId } = getValues();
  const transactionName = useStoreState((state: any) => state.transactions.map[transactionId].name);

  return (
    <div className={cn.topbar}>
      <h1 className={cn.name}>{transactionName}</h1>
      <div className={cn.sideMenu}>
        <SideMenu transactionId={transactionId} navigate={navigate} />
      </div>
    </div>
  );
};
