import { components } from 'react-select';
import { CopyButton } from '../../../CopyButton/CopyButton.jsx';
import cn from './IndicatorsContainer.module.scss';

//We have in default 4 children :
// [0] - clear, [1] - loading [2] - separator, [3] - dropDown
export const IndicatorsContainer = ({ children, ...props }) => (
  <components.IndicatorsContainer {...props}>
    <div className={cn.container}>
      {children[0]}
      {children[1]}
      {children[2]}
      {props.selectProps.value?.value && !props.isDisabled && (
        <div className={cn.copyContainer} onMouseDown={(e) => e.stopPropagation()}>
          <CopyButton value={props.selectProps.value?.value} />
        </div>
      )}
      {children[3]}
    </div>
  </components.IndicatorsContainer>
);
