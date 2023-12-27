import cn from './Label.module.css';

export const Label = ({ name, type }: any) => {
  const iconType: any = {
    ledger: '/ledger.svg',
    locally: '/locally.svg',
    functionCall: '/functionCall.svg',
    fullAccess: '/fullAccess.svg',
  };
  const color: any = {
    ledger: '#e16bb7',
    locally: '#6851f4',
    functionCall: '#f4bd51',
    fullAccess: '#4ad135',
  };

  return (
    <span className={cn.label} style={{ backgroundColor: color[type] }}>
      <img className={cn.icon} alt="#" src={iconType[type]} />
      {name}
    </span>
  );
};
