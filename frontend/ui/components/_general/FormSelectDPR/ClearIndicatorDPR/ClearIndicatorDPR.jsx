import { components } from 'react-select';
import cn from './ClearIndicatorDPR.module.css';
import { CloseIcon } from '../../icons/CloseIcon.jsx';

export const ClearIndicatorDPR = ({ children, ...props }) => (
  <components.ClearIndicator {...props}>
    <div className={cn.container}>
      <button className={cn.copyButton} type="button" onClick={props.clearValue}>
        <CloseIcon style={cn.icon} />
      </button>
      {children}
    </div>
  </components.ClearIndicator>
);
