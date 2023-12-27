import cn from './Label.module.css';

export const Label = ({ name, type }: any) => {
  const iconType: any = {
    ledger: '/ledger.svg',
    functionCall: '/functionCall.svg',
  };
  const color: any = {
    ledger: '#6851f4',
    functionCall: '#f4bd51',
  };

  return (
    <span className={cn.label} style={{ backgroundColor: color[type] }}>
      <img className={cn.icon} alt="#" src={iconType[type]} />
      {name}
    </span>
  );
};
