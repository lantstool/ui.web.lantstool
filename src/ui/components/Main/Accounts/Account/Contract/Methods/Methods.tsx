import cn from './Methods.module.css';

const isExistMethods = (contract: any) => ({
  view: contract?.methods.view.length > 0,
  change: contract?.methods.change.length > 0,
});

export const Methods = ({ contract }: any) => {
  const { view, change } = isExistMethods(contract);

  return (
    <div className={cn.methods}>
      {change && (
        <div className={cn.wrapper}>
          <h4 className={cn.title}>Change methods</h4>
          {contract.methods.change.map((method: any) => (
            <div key={method.methodName}>
              <p className={cn.subtitle}>{method.methodName}</p>
            </div>
          ))}
        </div>
      )}
      {view && (
        <div className={cn.wrapper}>
          <h4 className={cn.title}>View methods</h4>
          {contract.methods.view.map((method: any) => (
            <div key={method.methodName}>
              <p className={cn.subtitle}>{method.methodName}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
