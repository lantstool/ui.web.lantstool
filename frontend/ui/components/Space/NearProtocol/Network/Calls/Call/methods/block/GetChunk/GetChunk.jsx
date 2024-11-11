import { SearchType } from './SearchBy/SearchBy.jsx';
import { Form } from '../../_general/Form/Form.jsx';

export const GetChunk = ({ call, draft }) => {
  return (
    <Form call={call} draft={draft}>
      <SearchType />
    </Form>
  );
};
