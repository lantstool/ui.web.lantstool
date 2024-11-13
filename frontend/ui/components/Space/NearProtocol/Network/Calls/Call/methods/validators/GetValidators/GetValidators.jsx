import { Form } from '../../_general/Form/Form.jsx';
import { EpochTarget } from './EpochTarget/EpochTarget.jsx';

export const GetValidators = ({ call, draft }) => {
  return (
    <Form call={call} draft={draft}>
      <EpochTarget />
    </Form>
  );
};
