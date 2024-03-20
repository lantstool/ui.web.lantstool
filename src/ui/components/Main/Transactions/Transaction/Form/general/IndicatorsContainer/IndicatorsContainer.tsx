import { components } from 'react-select';
import { CopyButton } from '../../../../../general/CopyButton/CopyButton.tsx';
import cn from './IndicatorsContainer.module.css';

export const IndicatorsContainer = ({ children, ...props }: any) => {
  return (
    <components.IndicatorsContainer {...props}>
      {children[0]}
      {children[1]}
      {children[2]}
      <div className={cn.container}>
        <div className={cn.copyButton} onMouseDown={(e) => e.stopPropagation()}>
          <CopyButton text={props.selectProps.value?.value} />
        </div>
      </div>
      {children[3]}
    </components.IndicatorsContainer>
  );
};
