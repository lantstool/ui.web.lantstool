import { FormDropdown } from '../../../../../../../../_general/dropdown/FormDropdown.jsx';
import { useAccountsOptions } from '../../../../../_general/hooks/useAccountsOptions.js';
import { Form } from '../../_general/components/Form/Form.jsx';
import { MethodDescription } from '../../_general/components/MethodDescription/MethodDescription.jsx';
import { ConfigureTitle } from '../../_general/components/ConfigureTitle/ConfiguresTitle.jsx';
import { schema } from './schema.js';

export const GetMaintenanceWindows = ({ call, draft }) => {
  const options = useAccountsOptions();
  return (
    <Form
      call={call}
      draft={draft}
      schema={schema}
      methodDescription={
        <MethodDescription
          description={
            <>
              It allows querying for scheduled maintenance periods during the current epoch for a
              specific validator. These windows are ranges of block heights when the validator does
              not need to produce blocks or chunks.
            </>
          }
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
      />
    </Form>
  );
};
