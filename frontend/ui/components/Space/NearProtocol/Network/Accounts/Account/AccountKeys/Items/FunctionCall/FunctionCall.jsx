import cn from './FunctionCall.module.scss';
import { utils } from 'near-api-js';
import { AccountCircleOutline } from '../../../../../../../../_general/icons/AccountCircleOutline.jsx';
import { BillCheckOutline } from '../../../../../../../../_general/icons/BillCheckOutline.jsx';
import { CodeCircleOutline } from '../../../../../../../../_general/icons/CodeCircleOutline.jsx';
import { useMethods } from './useMethods.jsx';
import { Label } from '../../../../../../../../_general/Label/Label.jsx';
import { CloseSquareOutline } from '../../../../../../../../_general/icons/CloseSquareOutline.jsx';

const getAmount = (amount) =>
  amount ? `${utils.format.formatNearAmount(amount)} NEAR` : 'Unlimited';

const getMethods = (methodNames, maxMethods, setShowAll, showAll) => {
  if (methodNames.length > 0) {
    const visibleMethods = methodNames.slice(0, maxMethods);
    const hiddenMethodsCount = methodNames.length - visibleMethods.length;

    return (
      <>
        {visibleMethods.map((method, index) => (
          <Label color="grey" key={index}>
            {method}
          </Label>
        ))}
        {hiddenMethodsCount > 0 && (
          <button className={cn.showBtn} onClick={() => setShowAll(true)}>
            +{hiddenMethodsCount}
          </button>
        )}
        {showAll && (
          <button className={cn.hideBtn} onClick={() => setShowAll(false)}>
            <CloseSquareOutline style={cn.iconClose} />
          </button>
        )}
      </>
    );
  }
  return <p className={cn.subtitle}>All</p>;
};

export const FunctionCall = ({ functionKey }) => {
  const { allowance, methodNames, receiverId } = functionKey.accessKey.permission.functionCall;
  const { maxMethods, ref, setShowAll, showAll } = useMethods(methodNames);
  const methods = getMethods(methodNames, maxMethods, setShowAll, showAll);

  return (
    <div className={cn.container}>
      <div className={cn.wrapper}>
        <AccountCircleOutline style={cn.icon} />
        <p className={cn.title}>Contract ID</p>
        <p className={cn.subtitle}>{receiverId}</p>
      </div>
      <div className={cn.wrapper}>
        <BillCheckOutline style={cn.icon} />
        <p className={cn.title}>Amount allowance</p>
        <p className={cn.subtitle}>{getAmount(allowance)}</p>
      </div>
      <div className={cn.methodsContainer}>
        <div className={cn.wrapper}>
          <CodeCircleOutline style={cn.icon} />
          <p className={cn.title}>Allowed methods</p>
        </div>
        <div className={cn.methods} ref={ref}>
          {methods}
        </div>
      </div>
    </div>
  );
};
