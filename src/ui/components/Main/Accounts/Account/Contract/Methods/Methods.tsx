import cn from './Methods.module.css';

export const Methods = ({ account }: any) => {
  return (
    <div className={cn.methods}>
      <h4>Change methods</h4>
      {account.contract.methods.change.map(method => (
        <div key={method.name}>
          <p>{method.name}</p>
        </div>
      ))}
      <h4>View methods</h4>
      {account.contract.methods.view.map(method => (
        <div key={method.name}>
          <p>{method.name}</p>
        </div>
      ))}
    </div>
  );
};
