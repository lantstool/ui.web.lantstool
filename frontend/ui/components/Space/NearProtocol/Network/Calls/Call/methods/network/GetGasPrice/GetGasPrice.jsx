import { Form } from '../../_general/Form/Form.jsx';
import { BlockTarget } from './BlockTarget/BlockTarget.jsx';

export const GetGasPrice = ({ call, draft }) => {
  return (
    <Form call={call} draft={draft}>
      <p>Returns gas price for a latest or a specific block</p>
      <BlockTarget />
    </Form>
  );
};
