import { components } from 'react-select';
import { CopyButton } from '../../../../../../Vault/Account/Key/general/CopyButton/CopyButton.tsx';

export const IndicatorsContainer = ({ children, ...props }: any) => {
  const onClick = (e) => {
    console.log('container')
    console.log(e);
    e.nativeEvent.stopImmediatePropagation();
    e.stopPropagation();
  };

  return (
      <components.IndicatorsContainer {...props}>
        <div onClick={(e) => onClick(e)} style={{ display: 'flex', alignItems: 'center' }}>
          <div onClick={(e) => onClick(e)}>
            <CopyButton text={props.selectProps.value.value} />
          </div>
          {children}
        </div>
      </components.IndicatorsContainer>
  );
};
