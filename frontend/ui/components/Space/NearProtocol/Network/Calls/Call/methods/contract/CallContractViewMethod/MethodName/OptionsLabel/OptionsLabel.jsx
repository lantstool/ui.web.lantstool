import { components } from 'react-select';
import { Label } from '@gc/Label/Label.jsx';
import cn from './OptionsLabel.module.scss';

const type = {
  init: { color: 'green', text: 'Init' },
  payable: { color: 'red', text: 'Payable' },
  private: { color: 'blue', text: 'Private' },
};

export const Option = ({ props, records, contractHash, methodType}) => {
  const isAbiSupported = records[contractHash].isAbiSupported;

  const functions= methodType === 'read'
    ? records[contractHash]?.readFunctions
    : records[contractHash]?.writeFunctions;

  const modifiers = isAbiSupported
    ? functions[props.data.label]?.modifiers
    : null;

  return (
    <components.Option {...props}>
      <div className={cn.container}>
        {props.data.label}
        <div className={cn.wrapper}>
          {modifiers &&
            modifiers.map((mod) => (
              <div key={mod} className={cn.modWrapper}>
                <Label key={mod} size="small" color={type[mod].color}>
                  {type[mod].text}
                </Label>
              </div>
            ))}
          <span
            className={props.selectProps.value?.label === props.data?.label ? cn.icon : cn.hidden}
          />
        </div>
      </div>
    </components.Option>
  );
};
