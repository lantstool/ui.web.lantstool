import { Allowance } from './Allowance/Allowance.jsx';
import { AllowedMethods } from './AllowedMethods/AllowedMethods.jsx';
import { FormDropdown } from '../../../../../../../../../../_general/FormDropdown/FormDropdown.jsx';
import { Tooltip } from '../../../../../../../../../../_general/Tooltip/Tooltip.jsx';
import { useAccountsOptions } from '../../../../../../../_general/hooks/useAccountsOptions.js';
import cn from './FunctionCall.module.scss';

export const FunctionCall = ({ form, getName }) => {
  const options = useAccountsOptions();

  return (
    <>
      <div className={cn.functionCall}>
        <FormDropdown
          control={form.control}
          options={options}
          name={getName('permission.restrictions.receiverId')}
          label="Contact Id"
          isClearable
          isSearchable
          creatableSelect
          tooltip={<Tooltip placement="top" content="Contract Id" defaultContent />}
        />
      </div>
      <Allowance form={form} getName={getName} />
      <AllowedMethods form={form} getName={getName} />
    </>
  );
};
