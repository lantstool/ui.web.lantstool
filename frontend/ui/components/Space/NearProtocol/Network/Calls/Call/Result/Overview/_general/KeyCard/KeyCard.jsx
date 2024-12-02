import accountCircleOutline from '@assets/accountCircleOutline.svg';
import billCheckOutline from '@assets/billCheckOutline.svg';
import nonceCircleOutline from '@assets/nonceCircleOutline.svg';
import codeCircleOutline from '@assets/codeCircleOutline.svg';
import { Item } from '../Item/Item.jsx';
import { formatNumber } from '../../../../../../../../../../../store/helpers/utils.js';
import { CopyButton } from '../../../../../../../../../_general/CopyButton/CopyButton.jsx';
import cn from './KeyCard.module.scss';

const getAmount = (amount) => (amount ? `${formatNumber(amount)} NEAR` : 'Unlimited');

export const KeyCard = ({ result, publicKey, accountId }) => {
  const keyType = result.permission === 'FullAccess' ? 'fullAccess' : 'functionCall';
  const allowance = getAmount(result.permission.functionCall?.allowance);

  return (
    <div className={cn.keyCard}>
      <div className={cn.keyWrapper}>
        <h2 className={cn.key}>{publicKey}</h2>
        <CopyButton value={publicKey} />
      </div>
      {keyType === 'fullAccess' && (
        <div className={cn.container}>
          <div className={cn.wrapper}>
            <img src={nonceCircleOutline} alt="#" />
            <h2 className={cn.title}>Nonce</h2>
          </div>
          <h2 className={cn.data}>{result.nonce}</h2>
        </div>
      )}
      {keyType === 'functionCall' && (
        <div className={cn.card}>
          <Item title="Contract ID" data={accountId} icon={accountCircleOutline} />
          <Item title="Amount allowance" data={allowance} icon={billCheckOutline} />
          <Item title="Nonce" data={result.nonce} icon={nonceCircleOutline} />
          <Item
            title="Allowed methods"
            methods={result.permission.functionCall.methodNames}
            icon={codeCircleOutline}
          />
        </div>
      )}
    </div>
  );
};
