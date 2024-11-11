import { Form } from '../_general/Form/Form.jsx';
import { AccountIds } from '../_general/AccountIds/AccountIds.jsx';
import { BlockTarget } from '../_general/BlockTarget/BlockTarget.jsx';

export const GetChangesForAccountKeys = ({ call, draft }) => {
  return (
    <Form call={call} draft={draft}>
      <AccountIds accountIds={draft.accountIds} />
      <BlockTarget />
    </Form>
  );
};
