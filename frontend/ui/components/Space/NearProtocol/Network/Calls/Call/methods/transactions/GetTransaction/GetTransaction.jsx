import { FormDropdown } from '../../../../../../../../_general/dropdown/FormDropdown.jsx';
import { useAccountsOptions } from '../../../../../_general/hooks/useAccountsOptions.js';
import { Form } from '../../_general/components/Form/Form.jsx';
import { FormInput } from '../../../../../../../../_general/input/FormInput/FormInput.jsx';
import { WaitUntil } from '.././_general/WaitUntil.jsx';
import { MethodDescription } from '../../_general/components/MethodDescription/MethodDescription.jsx';
import { ConfigureTitle } from '../../_general/components/ConfigureTitle/ConfiguresTitle.jsx';
import { schema } from './schema.js';

export const GetTransaction = ({ call, draft }) => {
  const options = useAccountsOptions();
  return (
    <Form
      call={call}
      draft={draft}
      schema={schema}
      methodDescription={
        <MethodDescription
          description={<>Returns a summary of a transaction (excluding receipts).</>}
          link="https://docs.near.org/api/rpc/transactions#transaction-status"
        />
      }
    >
      <ConfigureTitle />
      <FormInput name="transactionHash" label="Transaction Hash" />
      <FormDropdown
        name="signerId"
        label="Signer Id"
        options={options}
        isSearchable
        isClearable
        creatableSelect
      />
      <WaitUntil />
    </Form>
  );
};
