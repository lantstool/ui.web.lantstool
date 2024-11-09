import { Form } from '../../_general/Form/Form.jsx';
import { AccountId } from './AccountKeyPairs/AccountId.jsx';
import { PublicKey } from './AccountKeyPairs/PublicKey/PublicKey.jsx';
import { BlockTarget } from '../../_general/BlockTarget/BlockTarget.jsx';

export const GetKeyChanges = ({ call, draft }) => {
  return (
    <Form call={call} draft={draft}>
      <AccountId />
      <PublicKey />
      <BlockTarget />
    </Form>
  );
};
