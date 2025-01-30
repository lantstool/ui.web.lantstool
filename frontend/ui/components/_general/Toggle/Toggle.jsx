import { Tooltip } from '../Tooltip/Tooltip.jsx';
import cn from './Toggle.module.scss';
import cnm from 'classnames';

export const Toggle = ({ value, onChange, labelText, tooltip, disabled }) => {
  const toggle = () => {
    onChange(!value);
  };

  return (
    <div className={cn.toggle}>
      <button
        className={cnm(cn.button, value && cn.buttonActive)}
        onClick={toggle}
        type="button"
        disabled={disabled}
      >
        <div className={cnm(cn.circle, value && cn.circleActive)} />
      </button>
      {labelText && <span className={cn.label}>{labelText}</span>}
      {tooltip && (
        <Tooltip content={tooltip.content} placement={tooltip.placement || 'top'} defaultContent />
      )}
    </div>
  );
};
