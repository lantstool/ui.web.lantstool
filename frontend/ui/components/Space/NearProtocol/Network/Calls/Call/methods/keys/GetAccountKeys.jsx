import { FormDropdown } from '../../../../../../../_general/FormDropdown/FormDropdown.jsx';
import { useAccountsOptions } from '../../../../_general/hooks/useAccountsOptions.js';
import { Form } from '../_general/Form/Form.jsx';
import { BlockTarget } from '../_general/BlockTarget/BlockTarget.jsx';
import { MethodDescription } from '../_general/MethodDescription/MethodDescription.jsx';
import { ConfigureTitle } from '../_general/ConfigureTitle/ConfiguresTitle.jsx';
import { Tooltip } from '../../../../../../../_general/Tooltip/Tooltip.jsx';
import { InfoCircleLinear } from '../../../../../../../_general/icons/InfoCircleLinear.jsx';

export const GetAccountKeys = ({ call, draft }) => {
  const options = useAccountsOptions();
  return (
    <Form
      call={call}
      draft={draft}
      methodDescription={
        <MethodDescription
          description="Provides general account details, including creation date, associated keys, and possibly the contract’s state."
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
        tooltip={
          <Tooltip content="Account id" placement="top">
            <InfoCircleLinear />
          </Tooltip>
        }
      />
      <BlockTarget />
    </Form>
  );
};
