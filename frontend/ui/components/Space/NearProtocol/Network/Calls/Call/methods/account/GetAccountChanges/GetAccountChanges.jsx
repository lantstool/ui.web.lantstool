import { Form } from '../../_general/Form/Form.jsx';
import { BlockTarget } from '../../_general/BlockTarget/BlockTarget.jsx';
import { AccountIds } from '../../_general/AccountIds/AccountIds.jsx';
import { MethodDescription } from '../../_general/MethodDescription/MethodDescription.jsx';
import { ConfigureTitle } from '../../_general/ConfigureTitle/ConfiguresTitle.jsx';
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
