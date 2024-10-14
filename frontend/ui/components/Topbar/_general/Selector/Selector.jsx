import Select from 'react-select';
import { selectStyles } from './Selector.style.js';
import { DropdownIndicator } from './DropdownIndicator/DropdownIndicator.jsx';
import { SingleValue } from './SingleValue/SingleValue.jsx';


export const Selector = ({ onChange, options, defaultValue }) => {
  const style = selectStyles();

  return (
    <Select
      components={{ DropdownIndicator, SingleValue }}
      onChange={onChange}
      defaultValue={defaultValue}
      styles={style}
      isSearchable={false}
      options={options}
    />
  );
};
