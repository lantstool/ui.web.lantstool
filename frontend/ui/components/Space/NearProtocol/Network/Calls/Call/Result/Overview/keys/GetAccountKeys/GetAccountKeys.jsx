import { KeyCard } from '../../_general/KeyCard/KeyCard.jsx';
import cn from './GetAccountKeys.module.scss';

export const GetAccountKeys = ({ result, draft }) => (
  <div className={cn.getAccountKeys}>
    {result.keys.map((key) => (
      <KeyCard
        key={key.publicKey}
        result={key.accessKey}
        publicKey={key.publicKey}
        accountId={draft.accountId.value}
      />
    ))}
  </div>
);
