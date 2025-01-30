import { FormDropdown } from '../../../../../../../../_general/dropdown/FormDropdown.jsx';
import { FormInput } from '../../../../../../../../_general/input/FormInput/FormInput.jsx';
import { useAccountsOptions } from '../../../../../_general/hooks/useAccountsOptions.js';
import { Form } from '../../_general/components/Form/Form.jsx';
import { BlockTarget } from '../../_general/components/BlockTarget/BlockTarget.jsx';
import { MethodDescription } from '../../_general/components/MethodDescription/MethodDescription.jsx';
import { ConfigureTitle } from '../../_general/components/ConfigureTitle/ConfiguresTitle.jsx';
import { schema } from './schema.js';

export const GetContractState = ({ call, draft }) => {
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
              Returns the contract state (key-value pairs) encoded in base64. To obtain
              human-readable data, you must additionally convert this information using a Borsh
              schema derived from the contract’s state structure. It is also possible to filter the
              state by a specific key prefix (the prefix is defined in the contract code for
              collections such as a Lookup Map).
            </>
          }
          link="https://docs.near.org/api/rpc/contracts#view-contract-state"
        />
      }
    >
      <ConfigureTitle />
      <FormDropdown
        name="contractId"
        label="Contract Id"
        options={options}
        isSearchable
        isClearable
        creatableSelect
      />
      <FormInput name="keyPrefix" label="Key Prefix" />
      <BlockTarget />
    </Form>
  );
};
