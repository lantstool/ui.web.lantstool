import { Controller } from 'react-hook-form';
import { Dropdown } from './Dropdown/Dropdown.jsx';

export const FormDropdown = ({
  control,
  onChange,
  options,
  name,
  isDisabled,
  creatableSelect,
  isSearchable,
  isClearable,
  label,
  tooltip,
  copy,
  placeholder,
  dynamicErrorSpace,
  menuParams,
  onBlur,
  dropdownRef,
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState: { error } }) => {
      const innerOnChange = onChange ? onChange(field) : field.onChange;
      const innerOnBlur = onBlur ? onBlur(field) : field.onBlur;
      const innerRef = dropdownRef ? dropdownRef : field.ref;
      return (
        <Dropdown
          value={field.value}
          onChange={innerOnChange}
          onBlur={innerOnBlur}
          innerRef={innerRef}
          options={options}
          placeholder={placeholder}
          isDisabled={isDisabled}
          isClearable={isClearable}
          isSearchable={isSearchable}
          creatableSelect={creatableSelect}
          copy={copy}
          label={label}
          tooltip={tooltip}
          error={error?.message}
          dynamicErrorSpace={dynamicErrorSpace}
          menuParams={menuParams}
        />
      );
    }}
  />
);
