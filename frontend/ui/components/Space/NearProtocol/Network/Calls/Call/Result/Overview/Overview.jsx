import { GetAccount } from './account/GetAccount/GetAccount.jsx';
import { GetAccountKeys } from './keys/GetAccountKeys/GetAccountKeys.jsx';
import { GetAccountKey } from './keys/GetAccountKey/GetAccountKey.jsx';
import { toCamelCase } from '../../../../../../../../../store/helpers/toCamelCase.js';
import cn from './Overview.module.scss';

export const Overview = ({ result, draft }) => {
  const method = draft.method.value;
  const camelCaseResult = toCamelCase(result);

  return (
    <div className={cn.overview}>
      {method === 'getAccount' && <GetAccount result={camelCaseResult} draft={draft} />}
      {method === 'getAccountKeys' && <GetAccountKeys result={camelCaseResult} draft={draft} />}
      {method === 'getAccountKey' && <GetAccountKey result={camelCaseResult} draft={draft} />}
    </div>
  );
};
