import { Form } from '../../_general/components/Form/Form.jsx';
import { BlockTarget } from '../../_general/components/BlockTarget/BlockTarget.jsx';
import { AccountIds } from '../../_general/components/AccountIds/AccountIds.jsx';
import { MethodDescription } from '../../_general/components/MethodDescription/MethodDescription.jsx';
import { ConfigureTitle } from '../../_general/components/ConfigureTitle/ConfiguresTitle.jsx';
import { schema } from './schema.js';

export const GetAccountChanges = ({ call, draft }) => {
  return (
    <Form
      call={call}
      draft={draft}
      schema={schema}
      methodDescription={
        <MethodDescription
          description="Provides general account details, including creation date, associated keys, and possibly the contract’s state."
          link="https://docs.near.org/api/rpc/contracts#view-account-changes"
        />
      }
    >
      <ConfigureTitle />
      <AccountIds accountIds={draft.accountIds} />
      <BlockTarget />
    </Form>
  );
};
