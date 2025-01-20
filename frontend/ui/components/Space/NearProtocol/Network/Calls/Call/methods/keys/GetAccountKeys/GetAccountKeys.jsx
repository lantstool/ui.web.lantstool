import { FormDropdown } from '../../../../../../../../_general/dropdown/FormDropdown.jsx';
import { useAccountsOptions } from '../../../../../_general/hooks/useAccountsOptions.js';
import { Form } from '../../_general/components/Form/Form.jsx';
import { BlockTarget } from '../../_general/components/BlockTarget/BlockTarget.jsx';
import { MethodDescription } from '../../_general/components/MethodDescription/MethodDescription.jsx';
import { ConfigureTitle } from '../../_general/components/ConfigureTitle/ConfiguresTitle.jsx';
import { schema } from './schema.js';

export const GetAccountKeys = ({ call, draft }) => {
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
              Returns a list of all account keys with detailed information for each, including nonce
              and permission.
            </>
          }
          link="https://docs.near.org/api/rpc/access-keys#view-access-key-list"
        />
      }
    >
      <ConfigureTitle />
      <FormDropdown
        name="accountId"
        label="Account Id"
        options={options}
        isSearchable
        isClearable
        creatableSelect
      />
      <BlockTarget />
    </Form>
  );
};
