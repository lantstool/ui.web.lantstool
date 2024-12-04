import { FormDropdown } from '../../../../../../../_general/FormDropdown/FormDropdown.jsx';
import { useAccountsOptions } from '../../../../_general/hooks/useAccountsOptions.js';
import { Form } from '../_general/Form/Form.jsx';
import { Tooltip } from '../../../../../../../_general/Tooltip/Tooltip.jsx';
import { MethodDescription } from '../_general/MethodDescription/MethodDescription.jsx';
import { ConfigureTitle } from '../_general/ConfigureTitle/ConfiguresTitle.jsx';

export const GetMaintenanceWindows = ({ call, draft }) => {
  const options = useAccountsOptions();
  // TODO add custom validation for the form
  return (
    <Form
      call={call}
      draft={draft}
      methodDescription={
        <MethodDescription
          description="It allows querying for scheduled maintenance periods during the current epoch for a specific validator. These windows are ranges of block heights when the validator does not need to produce blocks or chunks."
          link="https://docs.near.org/api/rpc/maintenance-windows#maintenance-windows"
        />
      }
    >
      <ConfigureTitle />
      <FormDropdown
        name="validatorId"
        label="Validator Id"
        options={options}
        isSearchable
        isClearable
        creatableSelect
        tooltip={<Tooltip content="Validator id" placement="top" defaultContent />}
      />
    </Form>
  );
};
