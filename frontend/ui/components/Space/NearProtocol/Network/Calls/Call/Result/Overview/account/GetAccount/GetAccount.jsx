import { Item } from '../../_general/Item/Item.jsx';
import accountCircleOutline from '@assets/accountCircleOutline.svg';
import walletOutline from '@assets/walletOutline.svg';
import storageSquareOutline from '@assets/storageSquareOutline.svg';
import deployContractLinear from '@assets/deployContractLinear.svg';
import { formatNumber } from '../../../../../../../../../../../store/helpers/utils.js';
import cn from './GetAccount.module.scss';

const formatResult = (result) => {
  const storageUsage = result.storageUsage / 1000;
  const hasDeployedContract = result.codeHash !== '11111111111111111111111111111111';
  const balance = formatNumber(result.amount);
  return { storageUsage, hasDeployedContract, balance };
};

export const GetAccount = ({ result, draft }) => {
  const { storageUsage, hasDeployedContract, balance } = formatResult(result);

  return (
    <div className={cn.getAccount}>
      <Item title="Account ID" data={draft.accountId.value} icon={accountCircleOutline} />
      <Item title="Account balance" data={balance} icon={walletOutline} />
      <Item title="Storage used" data={storageUsage} icon={storageSquareOutline} />
      <Item
        title="Has deployed contract"
        data={hasDeployedContract ? 'Yes' : 'No'}
        icon={deployContractLinear}
      />
    </div>
  );
};
