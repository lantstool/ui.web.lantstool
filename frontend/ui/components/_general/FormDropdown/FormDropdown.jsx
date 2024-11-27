import { Controller } from 'react-hook-form';
import { Dropdown } from '../Dropdown/Dropdown.jsx';

export const FormDropdown = ({
  control,
  onChange,
  options,
  name,
  error,
  isDisabled,
  creatableSelect,
  isSearchable,
  isClearable,
  label,
  tooltip,
  copy,
  placeholder,
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => {
      const innerOnChange = onChange ? onChange(field) : field.onChange;
      return (
        <Dropdown
          field={field}
          error={error}
          onChange={innerOnChange}
          options={options}
          placeholder={placeholder}
          isDisabled={isDisabled}
          isClearable={isClearable}
          isSearchable={isSearchable}
          creatableSelect={creatableSelect}
          copy={copy}
          label={label}
          tooltip={tooltip}
        />
      );
    }}
  />
);
