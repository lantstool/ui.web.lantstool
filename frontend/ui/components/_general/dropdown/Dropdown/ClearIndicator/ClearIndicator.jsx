import { components } from 'react-select';
import cn from './ClearIndicator.module.scss';

export const ClearIndicator = ({ children, ...props }) => (
  <components.ClearIndicator {...props}>
    <div className={cn.container}>
      <button className={cn.button} type="button" onClick={props.clearValue}>
        <span className={cn.icon} />
      </button>
      {children}
    </div>
  </components.ClearIndicator>
);
