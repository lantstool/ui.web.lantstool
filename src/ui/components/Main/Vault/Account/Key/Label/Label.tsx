import cn from './Label.module.css';
import ledger from '../../../../../../../assets/ledger.svg';
import fullAccess from '../../../../../../../assets/fullAccess.svg';
import locally from '../../../../../../../assets/locally.svg';
import functionCall from '../../../../../../../assets/functionCall.svg';
import cnm from 'classnames';

const types: any = {
  ledger: { icon: ledger, colorClass: cn.ledger },
  locally: { icon: locally, colorClass: cn.locally },
  functionCall: { icon: functionCall, colorClass: cn.functionCall },
  fullAccess: { icon: fullAccess, colorClass: cn.fullAccess },
};

const getType = (type: any) => {
  return types[type] === undefined ? types['ledger'] : types[type];
};

export const Label = ({ text, type }: any) => {
  const { icon, colorClass } = getType(type);
  return (
    <span className={cnm(cn.label, colorClass)}>
      <img className={cn.icon} alt="#" src={icon} />
      {text}
    </span>
  );
};
