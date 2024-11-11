import { BlockTarget } from '../_general/BlockTarget/BlockTarget.jsx';
import { Form } from '../_general/Form/Form.jsx';

export const GetBlockChanges = ({ call, draft }) => {
  return (
    <Form call={call} draft={draft}>
      <BlockTarget />
    </Form>
  );
};
