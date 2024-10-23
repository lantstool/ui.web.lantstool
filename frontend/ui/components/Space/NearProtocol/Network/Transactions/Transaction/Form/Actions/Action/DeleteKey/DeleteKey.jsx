import Select from 'react-select';
import { selectStyles } from '../../../_general/selectStyles.js';
import { Controller, useWatch } from 'react-hook-form';
import { useDropdownOptions } from './useDropdownOptions.js';
import { Option } from '../../../_general/Option/Option.jsx';
import { SelectHeadLabel } from '../../../_general/SelectHeadLabel/SelectHeadLabel.jsx';
import cn from './DeleteKey.module.scss';

export const DeleteKey = ({ form, getName, action }) => {
  const { control, setValue } = form;
  const actions = useWatch({ control, name: `actions` });
  const options = useDropdownOptions(control);

  const findAction = actions.find((el) => el.actionId === action.actionId);

  const onChange = (field) => (event) => {
    field.onChange(event);
    setValue('accessKey', event);
  };

  return (
    <div className={cn.deleteKey}>
      <SelectHeadLabel text="Access Key" permission={findAction.accessKey} />
      <div>
        <Controller
          name={getName('accessKey')}
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              onChange={onChange(field)}
              isSearchable
              components={{ Option }}
              options={options}
              styles={selectStyles}
            />
          )}
        />
      </div>
    </div>
  );
};
