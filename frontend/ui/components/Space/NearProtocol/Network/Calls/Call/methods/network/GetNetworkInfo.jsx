import { Form } from '../_general/Form/Form.jsx';

export const GetNetworkInfo = ({ call, draft }) => {
  return (
    <Form call={call} draft={draft}>
      <p>
        Returns the current state of node network connections (active peers, transmitted data, etc.)
      </p>
    </Form>
  );
};
