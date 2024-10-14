import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { selectStyles } from './formSelectDPR.style.js';
import CreatableSelect from 'react-select/creatable';
import { DropdownIndicatorDPR } from './DropdownIndicatorDRP/DropdownIndicatorDPR.jsx';
import { ClearIndicatorDPR } from './ClearIndicatorDPR/ClearIndicatorDPR.jsx';
import { IndicatorsContainerDPR } from './IndicatorsContainerDRP/IndicatorsContainerDPR.jsx';

/*
  We flat options for more simple find the value because we can have a groped options
 */
const flatOptions = (options) =>
  options.reduce((acc, item) => {
    if (Array.isArray(item.options)) {
      return [...acc, ...flatOptions(item.options)];
    } else {
      acc.push(item);
      return acc;
    }
  }, []);

const findValue = (options, value) => options.find((option) => option.value === value);

export const FormSelectDPR = ({
  control,
  onChange = null,
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
  // const flatOpt = useMemo(() => flatOptions(options), [options]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <SelectComponent
          {...field}
          // value={findValue(flatOpt, field.value)}
          isDisabled={isDisabled}
          // onChange={onChange ? onChange(field) : (e) => field.onChange(e?.value || null)}
          onChange={onChange ? onChange(field) : field.onChange}
          isClearable={isClearable}
          isSearchable={isSearchable}
          components={{ ...components, DropdownIndicatorDPR, ClearIndicatorDPR, IndicatorsContainerDPR }}
          options={options}
          styles={style}
        />
      )}
    />
  );
};
