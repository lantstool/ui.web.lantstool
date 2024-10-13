import { components } from 'react-select';
import { NetworkOutline } from '../../../../_general/icons/NetworkOutline.jsx';
import cn from './SingleValue.module.scss';

export const SingleValue = ({ ...props }) => (
  <components.SingleValue {...props}>
    <div className={cn.wrapper}>
      <NetworkOutline style={cn.icon} />
      <span className={cn.text}>
        {props.data.label}
      </span>
    </div>
  </components.SingleValue>
);
