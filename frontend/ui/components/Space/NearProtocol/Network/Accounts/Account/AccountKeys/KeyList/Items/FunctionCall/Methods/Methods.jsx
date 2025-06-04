import { Label } from '@gc/Label/Label.jsx';
import cn from './Methods.module.scss';
import { useMethods } from './useMethods.js';

export const Methods = ({ methodNames }) => {
  const { maxMethods, ref, setShowAll, showAll } = useMethods(methodNames);

  if (methodNames.length === 0) return <p className={cn.subtitle}>All</p>;

  const visibleMethods = methodNames.slice(0, maxMethods);
  const hiddenMethodsCount = methodNames.length - visibleMethods.length;

  return (
    <div className={cn.methods} ref={ref}>
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
          Show less
        </button>
      )}
    </div>
  );
};
