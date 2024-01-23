import { components } from 'react-select';
import { CopyButton } from '../../../../../../general/CopyButton/CopyButton.tsx';
import cn from './IndicatorsContainer.module.css';

export const IndicatorsContainer = ({ children, ...props }: any) => {
  return (
    <components.IndicatorsContainer {...props}>
      <div className={cn.container}>
        <div onMouseDown={(e) => e.stopPropagation()}>
          <CopyButton text={props.selectProps.value?.value} />
        </div>
        {children}
      </div>
    </components.IndicatorsContainer>
  );
};
