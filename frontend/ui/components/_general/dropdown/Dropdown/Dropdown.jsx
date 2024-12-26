import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { DropdownIndicator } from './DropdownIndicator/DropdownIndicator.jsx';
import { ClearIndicator } from './ClearIndicator/ClearIndicator.jsx';
import { IndicatorsContainer } from './IndicatorsContainer/IndicatorsContainer.jsx';
import { FieldErrorLabel } from '../../FieldErrorLabel/FieldErrorLabel.jsx';
import { selectStyles } from './dropdown.style.js';
import { Option } from './Option/Option.jsx';
import cn from './Dropdown.module.scss';

export const Dropdown = ({
  onChange = () => ({}),
  onBlur = () => ({}),
  value,
  innerRef = null,
  options,
  error,
  dynamicErrorSpace = false,
  isDisabled,
  creatableSelect = false,
  isSearchable = false,
  isClearable = false,
  copy = true,
  placeholder = 'Select...',
  label = null,
  tooltip = null,
  components = {},
}) => {
  const SelectComponent = creatableSelect ? CreatableSelect : Select;
  const innerComponents = {
    DropdownIndicator,
    ClearIndicator,
    Option,
    ...(copy && { IndicatorsContainer }),
    ...components,
  };
  const style = selectStyles(error);

  return (
    <div className={cn.container}>
      {label && (
        <div className={cn.labelWrapper}>
          <label className={cn.label}>{label}</label>
          {tooltip}
        </div>
      )}
      <SelectComponent
        ref={innerRef}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        options={options}
        placeholder={isDisabled ? '' : placeholder}
        isDisabled={isDisabled}
        isClearable={isClearable}
        isSearchable={isSearchable}
        components={{ ...innerComponents }}
        styles={style}
      />
      <FieldErrorLabel error={error} dynamicErrorSpace={dynamicErrorSpace} />
    </div>
  );
};
