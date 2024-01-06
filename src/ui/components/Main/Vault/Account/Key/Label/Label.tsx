import cn from './Label.module.css';
import ledger from '../../../../../../../../public/ledger.svg';
import fullAccess from '../../../../../../../../public/fullAccess.svg';
import locally from '../../../../../../../../public/locally.svg';
import functionCall from '../../../../../../../../public/functionCall.svg';
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
