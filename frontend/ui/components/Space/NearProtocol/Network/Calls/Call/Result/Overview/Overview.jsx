import { GetAccount } from './account/GetAccount/GetAccount.jsx';
import { GetAccountKeys } from './keys/GetAccountKeys/GetAccountKeys.jsx';
import { GetAccountKey } from './keys/GetAccountKey/GetAccountKey.jsx';
import { GetContractWasm } from './contract/GetContractWasm/GetContractWasm.jsx';
import { toCamelCase } from '../../../../../../../../../store/helpers/toCamelCase.js';
import cn from './Overview.module.scss';

export const Overview = ({ result, formValues }) => {
  const method = formValues.method.value;
  const camelCaseResult = toCamelCase(result);

  return (
    <div className={cn.overview}>
      {method === 'getAccount' && <GetAccount result={camelCaseResult} formValues={formValues} />}
      {method === 'getAccountKeys' && (
        <GetAccountKeys result={camelCaseResult} formValues={formValues} />
      )}
      {method === 'getAccountKey' && (
        <GetAccountKey result={camelCaseResult} formValues={formValues} />
      )}
      {method === 'getContractWasm' && (
        <GetContractWasm result={camelCaseResult} formValues={formValues} />
      )}
    </div>
  );
};
