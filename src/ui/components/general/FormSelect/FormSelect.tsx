import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { selectStyles } from './formSelect.style.ts';
import CreatableSelect from 'react-select/creatable';

export const FormSelect = ({
  control,
  onChange = false,
  options,
  name,
  components,
  isSearchable = false,
  isClearable = false,
  error,
  creatableSelect = false,
}: any) => {
  const style = selectStyles(error);
  const SelectComponent = creatableSelect ? CreatableSelect : Select;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }: any) => {
        return (
          <SelectComponent
            {...field}
            onChange={onChange ? onChange(field) : field.onChange}
            isClearable={isClearable}
            isSearchable={isSearchable}
            components={components}
            options={options}
            styles={style}
          />
        );
      }}
    />
  );
};
