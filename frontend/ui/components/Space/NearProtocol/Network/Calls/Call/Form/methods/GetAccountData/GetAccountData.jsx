import { Dropdown } from '../../../../../../../../_general/Dropdown/Dropdown.jsx';
// import { Input } from '../../../../../../../_general/Input/Input.jsx';
import { useAccountsOptions } from '../../../../../_general/hooks/useAccountsOptions.js';
import { useFieldsDefaultValues } from '../../_general/hooks/useFieldsDefaultValues.js';

export const GetAccountData = ({ form }) => {
  const { control /*, register*/ } = form;
  const options = useAccountsOptions();

  useFieldsDefaultValues(form, {
    accountId: '',
    // finality: 'final',
    // blockId: '', // 177487025
  });

  return (
    <>
      <Dropdown
        name="params.accountId"
        label="Account Id"
        control={control}
        options={options}
        isSearchable
        isClearable
        creatableSelect
      />
      {/*<Input name="params.finality" register={register} control={control} label="Finality" />*/}
    </>
  );
};
