import cn from './Label.module.css';
import cnm from 'classnames';

const types: any = {
  lantstool: cn.lantstool,
  myNearWallet: cn.myNearWallet,
  ledger: cn.ledger,
};

const getType = (type: any) => {
  return types[type] === undefined ? types['ledger'] : types[type];
};

export const Label = ({ wallet }: any) => {
  const color = getType(wallet);

  return (
    <div className={cnm(cn.label, color)}>
      <p className={cn.text}>{wallet}</p>
    </div>
  );
};
