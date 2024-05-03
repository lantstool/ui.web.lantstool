import Select from 'react-select';
import { useEffect, useState } from 'react';
import { useStoreEffect } from '../../../../../../../../../react-vault';
import { selectStyles } from '../../../general/selectStyles.js';
import { Controller, useWatch } from 'react-hook-form';
import { getOptions } from './getOptions.js';
import cn from './DeleteKey.module.css';
import { Option } from '../../../general/Option/Option.jsx';
import { SelectHeadLabel } from '../../../general/SelectHeadLabel/SelectHeadLabel.jsx';

export const DeleteKey = ({ form, getName, action }) => {
  const [options, setOptions] = useState([]);
  const getAccessKeyList = useStoreEffect((store) => store.getAccessKeyList);
  const { control, setValue } = form;
  const accountId = useWatch({ control, name: 'signerId.value' });
  const actions = useWatch({ control, name: `actions` });
  const findAction = actions.find((el) => el.actionId === action.actionId);

  const onChange = (field) => (event) => {
    field.onChange(event);
    setValue('accessKey', event);
  };

  useEffect(() => {
    getOptions(accountId, getAccessKeyList, setOptions);
  }, [accountId]);

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
