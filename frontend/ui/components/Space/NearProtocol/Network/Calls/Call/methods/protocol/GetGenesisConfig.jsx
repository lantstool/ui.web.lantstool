import { Form } from '../_general/Form/Form.jsx';

export const GetGenesisConfig = ({ call, draft }) => {
  return (
    <Form call={call} draft={draft}>
     <p>Return current genesis configuration</p>
    </Form>
  );
};
