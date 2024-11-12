import { BlockTarget } from '../_general/BlockTarget/BlockTarget.jsx';
import { Form } from '../_general/Form/Form.jsx';

export const GetProtocolConfig = ({ call, draft }) => {
  return (
    <Form call={call} draft={draft}>
      <p>Returns a protocol configuration for most recent or a specific block</p>
      <BlockTarget />
    </Form>
  );
};
