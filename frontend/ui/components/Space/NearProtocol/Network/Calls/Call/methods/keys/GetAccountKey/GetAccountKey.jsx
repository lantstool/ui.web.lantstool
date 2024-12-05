import { Form } from '../../_general/Form/Form.jsx';
import { AccountId } from './AccountId.jsx';
import { PublicKey } from './PublicKey/PublicKey.jsx';
import { BlockTarget } from '../../_general/BlockTarget/BlockTarget.jsx';
import { ConfigureTitle } from '../../_general/ConfigureTitle/ConfiguresTitle.jsx';
import { MethodDescription } from '../../_general/MethodDescription/MethodDescription.jsx';
import { schema } from './schema.js';

export const GetAccountKey = ({ call, draft }) => {
  return (
    <Form
      call={call}
      draft={draft}
      schema={schema}
      methodDescription={
        <MethodDescription
          description="Provides general account details, including creation date, associated keys, and possibly the contract’s state."
          link="https://docs.near.org/api/rpc/access-keys#view-access-key"
        />
      }
    >
      <ConfigureTitle />
      <AccountId />
      <PublicKey />
      <BlockTarget />
    </Form>
  );
};
