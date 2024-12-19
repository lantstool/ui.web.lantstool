import { FormDropdown } from '../../../../../../../../_general/FormDropdown/FormDropdown.jsx';
import { useAccountsOptions } from '../../../../../_general/hooks/useAccountsOptions.js';
import { Form } from '../../_general/components/Form/Form.jsx';
import { Input } from '../../../../../../../../_general/Input/Input.jsx';
import { WaitUntil } from '.././_general/WaitUntil.jsx';
import { Tooltip } from '../../../../../../../../_general/Tooltip/Tooltip.jsx';
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
          description="Provides general account details, including creation date, associated keys, and possibly the contract’s state."
          link="https://docs.near.org/api/rpc/transactions#transaction-status"
        />
      }
    >
      <ConfigureTitle />
      <Input
        name="transactionHash"
        label="Transaction Hash"
        tooltip={<Tooltip content="Transaction hash" placement="top" defaultContent />}
      />
      <FormDropdown
        name="signerId"
        label="Signer Id"
        options={options}
        isSearchable
        isClearable
        creatableSelect
        tooltip={<Tooltip content="Signer Id" placement="top" defaultContent />}
      />
      <WaitUntil />
    </Form>
  );
};
