import { Label } from '../../../../../../_general/Label/Label.jsx';
import cn from './Item.module.scss';

export const Item = ({
  formType,
  setFormType,
  type,
  children,
  Icon,
  label = false,
  disabled = false,
}) => {
  const changeType = () => setFormType(type);
  const isActive = formType === type;

  return (
    <button
      onClick={changeType}
      className={disabled ? cn.disabled : isActive ? cn.active : cn.item}
    >
      <Icon style={cn.icon} />
      <div className={cn.container}>
        <p className={cn.title}>{children}</p>
        {label && <Label color="grey">{label}</Label>}
      </div>
    </button>
  );
};
