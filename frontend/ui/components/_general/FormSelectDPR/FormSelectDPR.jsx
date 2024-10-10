import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { selectStyles } from './formSelectDPR.style.js';
import CreatableSelect from 'react-select/creatable';
import { DropdownIndicatorDPR } from './DropdownIndicatorDRP/DropdownIndicatorDPR.jsx';
import { ClearIndicatorDPR } from './ClearIndicatorDPR/ClearIndicatorDPR.jsx';
import { IndicatorsContainerDPR } from './IndicatorsContainerDRP/IndicatorsContainerDPR.jsx';

export const FormSelectDPR = ({
  control,
  onChange = false,
  options,
  name,
  components,
  isSearchable = false,
  isClearable = false,
  error,
  isDisabled,
  creatableSelect = false,
}) => {
  const style = selectStyles(error);
  const SelectComponent = creatableSelect ? CreatableSelect : Select;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <SelectComponent
            {...field}
            isDisabled={isDisabled}
            onChange={onChange ? onChange(field) : field.onChange}
            isClearable={isClearable}
            isSearchable={isSearchable}
            components={{ ...components, DropdownIndicator: DropdownIndicatorDPR, ClearIndicator: ClearIndicatorDPR, IndicatorsContainer: IndicatorsContainerDPR }}
            options={options}
            styles={style}
          />
        );
      }}
    />
  );
};
