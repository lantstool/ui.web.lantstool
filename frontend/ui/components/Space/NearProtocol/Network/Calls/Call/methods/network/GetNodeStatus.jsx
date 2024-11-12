import { Form } from '../_general/Form/Form.jsx';

export const GetNodeStatus = ({ call, draft }) => {
  return (
    <Form call={call} draft={draft}>
     <p>Returns general status of a given node</p>
    </Form>
  );
};
