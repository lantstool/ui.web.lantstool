import { Form } from '../../_general/components/Form/Form.jsx';
import { Input } from '../../../../../../../../_general/Input/Input.jsx';
import { MethodDescription } from '../../_general/components/MethodDescription/MethodDescription.jsx';
import { ConfigureTitle } from '../../_general/components/ConfigureTitle/ConfiguresTitle.jsx';
import { Tooltip } from '../../../../../../../../_general/Tooltip/Tooltip.jsx';
import { schema } from './schema.js';

export const GetReceipt = ({ call, draft }) => {
  return (
    <Form
      call={call}
      draft={draft}
      schema={schema}
      methodDescription={
        <MethodDescription
          description="Provides general account details, including creation date, associated keys, and possibly the contract’s state."
          link="https://docs.near.org/api/rpc/transactions#receipt-by-id"
        />
      }
    >
      <ConfigureTitle />
      <Input
        name="receiptId"
        label="Receipt Id"
        tooltip={<Tooltip content="Receipt id" placement="top" defaultContent />}
      />
    </Form>
  );
};
