import { KeyCard } from '../../_general/KeyCard/KeyCard.jsx';
import cn from './GetAccountKeys.module.scss';

export const GetAccountKeys = ({ result, formValues }) => (
  <div className={cn.getAccountKeys}>
    {result.keys.map((key) => (
      <KeyCard
        key={key.publicKey}
        result={key.accessKey}
        publicKey={key.publicKey}
        accountId={formValues.accountId.value}
      />
    ))}
  </div>
);
