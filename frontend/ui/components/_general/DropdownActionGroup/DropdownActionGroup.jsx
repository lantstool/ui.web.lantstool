import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { DropdownIndicator } from '../Dropdown/DropdownIndicator/DropdownIndicator.jsx';
import { ClearIndicator } from '../Dropdown/ClearIndicator/ClearIndicator.jsx';
import { IndicatorsContainer } from '../Dropdown/IndicatorsContainer/IndicatorsContainer.jsx';
import { selectStyles } from './dropdownActionGroup.style.js';
import cn from './DropdownActionGroup.module.scss';

export const DropdownActionGroup = ({
  onChange = () => ({}),
  options,
  error,
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
  children,
  type = 'action',
  onClick,
}) => {
  const SelectComponent = creatableSelect ? CreatableSelect : Select;
  const components = { DropdownIndicator, ClearIndicator, ...(copy && { IndicatorsContainer }) };
  const style = selectStyles(error);
  console.log(onClick);
  return (
    <div className={cn.dropdownActionGroup}>
      {label && (
        <div className={cn.labelWrapper}>
          <label className={cn.label}>{label}</label>
          {tooltip}
        </div>
      )}
      <div className={cn.container}>
        <div className={cn.dropdownWrapper}>
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
        </div>
        <hr className={cn.border} />
        {type === 'action' && (
          <button onClick={onClick} className={cn.actionBtn}>
            {children}
          </button>
        )}
        {type === 'text' && <p className={cn.text}>{children}</p>}
      </div>

      {error && <p className={cn.error}>{error}</p>}
    </div>
  );
};
