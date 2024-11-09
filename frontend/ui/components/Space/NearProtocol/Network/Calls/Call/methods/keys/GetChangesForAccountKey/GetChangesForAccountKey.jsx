import { Form } from '../../_general/Form/Form.jsx';
import { AccountKeyPairs } from './AccountKeyPairs/AccountKeyPairs.jsx';
import { BlockTarget } from '../../_general/BlockTarget/BlockTarget.jsx';

export const GetChangesForAccountKey = ({ call, draft }) => {
  return (
    <Form call={call} draft={draft}>
      <AccountKeyPairs accountKeyPairs={draft.accountKeyPairs} />
      <BlockTarget />
    </Form>
  );
};
