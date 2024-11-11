import { Form } from '../_general/Form/Form.jsx';
import { Input } from '../../../../../../../_general/Input/Input.jsx';

export const GetReceipt = ({ call, draft }) => {
  return (
    <Form call={call} draft={draft}>
      <Input name="receiptId" label="Receipt Id" />
    </Form>
  );
};
