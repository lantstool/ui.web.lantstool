import { components } from 'react-select';
import { Label } from '@gc/Label/Label.jsx';
import cn from './OptionsLabel.module.scss';

const type = {
  init: { color: 'cyan', text: 'Init' },
  payable: { color: 'green', text: 'Payable' },
  private: { color: 'blue', text: 'Private' },
};

export const Option = ({ props }) => (
  <components.Option {...props}>
    <div className={cn.container}>
      <p className={cn.text}> {props.data.label}</p>
      <div className={cn.wrapper}>
        {props.data.modifiers &&
          props.data.modifiers.map((mod) => (
            <Label key={mod} size="small" color={type[mod].color}>
              {type[mod].text}
            </Label>
          ))}
        <span
          className={props.selectProps.value?.label === props.data?.label ? cn.icon : cn.hidden}
        />
      </div>
    </div>
  </components.Option>
);
