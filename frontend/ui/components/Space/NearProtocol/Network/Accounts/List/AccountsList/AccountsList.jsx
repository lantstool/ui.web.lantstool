import { Link } from 'react-router-dom';
import { useStoreState } from '@react-vault';
import { Label } from '../../../../../../_general/Label/Label.jsx';
import { CopyButton } from '../../../../../../_general/CopyButton/CopyButton.jsx';
import cn from './AccountsList.module.scss';

export const AccountsList = () => {
  const ids = useStoreState((store) => store.nearProtocol.accounts.ids);
  const records = useStoreState((store) => store.nearProtocol.accounts.records);

  return (
    <>
      <div className={cn.container}>
        {ids.map((accountId) => (
          <Link key={accountId} className={cn.item} to={`${accountId}/details`}>
            <div className={cn.wrapper}>
              <p className={cn.title}>{records[accountId].accountId}</p>
              {records[accountId].note && <Label color="grey">{records[accountId].note}</Label>}
            </div>
            <div className={cn.copy}>
              <CopyButton color="secondary" value={records[accountId].accountId} />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
