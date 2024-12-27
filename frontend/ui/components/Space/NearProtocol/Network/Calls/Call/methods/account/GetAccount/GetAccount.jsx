import { FormDropdown } from '../../../../../../../../_general/dropdown/FormDropdown.jsx';
import { useAccountsOptions } from '../../../../../_general/hooks/useAccountsOptions.js';
import { BlockTarget } from '../../_general/components/BlockTarget/BlockTarget.jsx';
import { Form } from '../../_general/components/Form/Form.jsx';
import { MethodDescription } from '../../_general/components/MethodDescription/MethodDescription.jsx';
import { Tooltip } from '../../../../../../../../_general/Tooltip/Tooltip.jsx';
import { ConfigureTitle } from '../../_general/components/ConfigureTitle/ConfiguresTitle.jsx';
import { schema } from './schema.js';
import cn from './GetAccount.module.scss';

export const GetAccount = ({ call, draft }) => {
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
              Provides general account information such as balance, storage usage and possible
              contract hash.
            </>
          }
          link="https://docs.near.org/api/rpc/contracts#view-account"
        />
      }
    >
      <ConfigureTitle />
      <div className={cn.wrapper}>
        <FormDropdown
          name="accountId"
          label="Account Id"
          options={options}
          isSearchable
          isClearable
          creatableSelect
          tooltip={<Tooltip content="Account Id" placement="top" defaultContent />}
        />
        <BlockTarget />
      </div>
    </Form>
  );
};
