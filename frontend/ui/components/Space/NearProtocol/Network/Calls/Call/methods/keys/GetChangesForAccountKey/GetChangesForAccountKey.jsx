import { Form } from '../../_general/Form/Form.jsx';
import { AccountKeyPairs } from './AccountKeyPairs/AccountKeyPairs.jsx';
import { BlockTarget } from '../../_general/BlockTarget/BlockTarget.jsx';
import { MethodDescription } from '../../_general/MethodDescription/MethodDescription.jsx';
import { ConfigureTitle } from '../../_general/ConfigureTitle/ConfiguresTitle.jsx';

export const GetChangesForAccountKey = ({ call, draft }) => {
  return (
    <Form
      call={call}
      draft={draft}
      methodDescription={
        <MethodDescription
          description="Provides general account details, including creation date, associated keys, and possibly the contract’s state."
          link="https://docs.near.org/api/rpc/access-keys#view-access-key-changes-single"
        />
      }
    >
      <ConfigureTitle />
      <AccountKeyPairs accountKeyPairs={draft.accountKeyPairs} />
      <BlockTarget />
    </Form>
  );
};
