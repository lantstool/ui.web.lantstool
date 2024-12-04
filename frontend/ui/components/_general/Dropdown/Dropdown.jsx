import cnm from 'classnames';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { DropdownIndicator } from './DropdownIndicator/DropdownIndicator.jsx';
import { ClearIndicator } from './ClearIndicator/ClearIndicator.jsx';
import { IndicatorsContainer } from './IndicatorsContainer/IndicatorsContainer.jsx';
import { selectStyles } from './dropdown.style.js';
import cn from './Dropdown.module.scss';

export const Dropdown = ({
  onChange = () => ({}),
  options,
  error,
  dynamicErrorSpace = false,
  isDisabled,
  value = null,
  creatableSelect = false,
  isSearchable = false,
  isClearable = false,
  copy = true,
  placeholder = 'Select...',
  field = null,
  label = null,
  tooltip = null,
}) => {
  const SelectComponent = creatableSelect ? CreatableSelect : Select;
  const components = { DropdownIndicator, ClearIndicator, ...(copy && { IndicatorsContainer }) };
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
        {...field}
        {...(value && { value })}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        isDisabled={isDisabled}
        isClearable={isClearable}
        isSearchable={isSearchable}
        components={{ ...components }}
        styles={style}
      />
      <p
        className={cnm(
          cn.error,
          dynamicErrorSpace && cn.dynamicErrorSpace,
          error && cn.activeError,
        )}
      >
        {error}
      </p>
    </div>
  );
};
