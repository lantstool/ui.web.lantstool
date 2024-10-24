import { components } from 'react-select';
import { CopyButton } from '../../../Space/NearProtocol/Network/_general/CopyButton/CopyButton.jsx';
import cn from './IndicatorsContainerDPR.module.css';

//We have in default 4 children :
// [0] - clear, [1] - loading [2] - separator, [3] - dropDown
export const IndicatorsContainerDPR = ({ children, ...props }) => (
  <components.IndicatorsContainer {...props}>
    {children[0]}
    {children[1]}
    {children[2]}
    {props.selectProps.value?.value && (
      <div className={cn.container}>
        <div className={cn.copyButton} onMouseDown={(e) => e.stopPropagation()}>
          <CopyButton text={props.selectProps.value?.value} size={16} />
        </div>
      </div>
    )}
    {children[3]}
  </components.IndicatorsContainer>
);
