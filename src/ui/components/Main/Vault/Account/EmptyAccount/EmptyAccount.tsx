import cn from './EmptyAccount.module.css';
import { SideMenu } from '../SideMenu/SideMenu.tsx';
import { ImportKey } from '../ImportKey/ImportKey.tsx';


export const EmptyAccount = ({ styles, accId }: any) => {

  return (
    <div className={styles.container}>
      <div className={cn.topBar}>
        <h2 className={styles.title}>{accId}</h2>
        <div className={cn.sideMenuContainer}>
          <SideMenu accountId={accId} />
        </div>
      </div>
      <div className={cn.importKeyContainer}>
        <ImportKey accountId={accId} />
      </div>
    </div>
  );
};
