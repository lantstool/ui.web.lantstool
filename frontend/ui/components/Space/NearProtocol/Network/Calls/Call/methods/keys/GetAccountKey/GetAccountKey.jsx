import { Form } from '../../_general/Form/Form.jsx';
import { AccountId } from './AccountId.jsx';
import { PublicKey } from './PublicKey/PublicKey.jsx';
import { BlockTarget } from '../../_general/BlockTarget/BlockTarget.jsx';

export const GetAccountKey = ({ call, draft }) => {
  return (
    <Form call={call} draft={draft}>
      <AccountId />
      <PublicKey />
      <BlockTarget />
    </Form>
  );
};
