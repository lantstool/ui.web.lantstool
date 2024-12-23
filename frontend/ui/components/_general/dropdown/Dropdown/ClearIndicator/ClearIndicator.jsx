import { components } from 'react-select';
import cn from './ClearIndicator.module.scss';
import { BackspaceOutline } from '../../../icons/BackspaceOutline.jsx';

export const ClearIndicator = ({ children, ...props }) => (
  <components.ClearIndicator {...props}>
    <div className={cn.container}>
      <button className={cn.button} type="button" onClick={props.clearValue}>
        <BackspaceOutline style={cn.icon} />
      </button>
      {children}
    </div>
  </components.ClearIndicator>
);
