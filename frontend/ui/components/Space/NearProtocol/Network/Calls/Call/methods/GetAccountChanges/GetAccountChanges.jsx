import { Form } from '../_general/Form/Form.jsx';
import { BlockTarget } from '../_general/BlockTarget/BlockTarget.jsx';
import { AccountIds } from './AccountIds.jsx';

const Fields = ({ form }) => {
  return (
    <>
      <BlockTarget form={form} />
    </>
  );
};

export const GetAccountChanges = ({ call, draft }) => {
  // TODO add custom validation for the form
  return (
    <Form call={call} draft={draft}>
      <Fields />
    </Form>
  );
};
