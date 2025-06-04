import { utils } from 'near-api-js';
import { Methods } from './Methods/Methods.jsx';
import cn from './FunctionCall.module.scss';

const getAmount = (amount) =>
  amount ? `${utils.format.formatNearAmount(amount)} NEAR` : 'Unlimited';

export const FunctionCall = ({ functionKey }) => {
  const { allowance, methodNames, receiverId } = functionKey.accessKey.permission.functionCall;

  return (
    <div className={cn.container}>
      <div className={cn.wrapper}>
        <span className={cn.contractIcon} />
        <p className={cn.title}>Contract ID</p>
        <p className={cn.subtitle}>{receiverId}</p>
      </div>
      <div className={cn.wrapper}>
        <span className={cn.amountIcon} />
        <p className={cn.title}>Amount allowance</p>
        <p className={cn.subtitle}>{getAmount(allowance)}</p>
      </div>
      <div className={cn.methodsContainer}>
        <div className={cn.wrapper}>
          <span className={cn.methodsIcon} />
          <p className={cn.title}>Allowed methods</p>
        </div>
        <Methods methodNames={methodNames} />
      </div>
    </div>
  );
};
