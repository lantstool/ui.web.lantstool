import cn from './FunctionCall.module.scss';
import { utils } from 'near-api-js';
import { AccountCircleOutline } from '../../../../../../../../_general/icons/AccountCircleOutline.jsx';
import { BillCheckOutline } from '../../../../../../../../_general/icons/BillCheckOutline.jsx';
import { CodeCircleOutline } from '../../../../../../../../_general/icons/CodeCircleOutline.jsx';
import { useMethods } from './useMethods.jsx';
import { Label } from '../../../../../../../../_general/Label/Label.jsx';

const getAmount = (amount) => (amount ? utils.format.formatNearAmount(amount) : 'Unlimited');
const getMethods = (methodNames, maxMethods, onShowMore, setShowAll) => {
  if (methodNames && methodNames.length > 0) {
    const visibleMethods = methodNames.slice(0, maxMethods);
    const hiddenMethodsCount = methodNames.length - visibleMethods.length;
    return (
      <>
        {visibleMethods.map((method) => (
          <Label color="grey" key={method}>
            {method}
          </Label>
        ))}
        {hiddenMethodsCount > 0 ? (
          <button className={cn.showBtn} onClick={()=>setShowAll(true)}>
            +{hiddenMethodsCount}
          </button>
        ) : (
          <button  onClick={()=>setShowAll(false)}>
            show less
          </button>
        )}
      </>
    );
  }
  return <p className={cn.subtitle}>All</p>;
};
export const FunctionCall = ({ functionKey }) => {
  const { allowance, methodNames, receiverId } = functionKey.accessKey.permission.functionCall;

  const { maxMethods, ref, handleShowMore, setShowAll } = useMethods(methodNames);

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
          {getMethods(methodNames, maxMethods, handleShowMore, setShowAll)}
        </div>
      </div>
    </div>
  );
};
