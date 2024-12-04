import { SearchType } from './SearchBy/SearchBy.jsx';
import { Form } from '../../_general/Form/Form.jsx';
import { MethodDescription } from '../../_general/MethodDescription/MethodDescription.jsx';
import { ConfigureTitle } from '../../_general/ConfigureTitle/ConfiguresTitle.jsx';

export const GetChunk = ({ call, draft }) => {
  return (
    <Form
      call={call}
      draft={draft}
      methodDescription={
        <MethodDescription
          description="Provides general account details, including creation date, associated keys, and possibly the contract’s state."
          link="https://docs.near.org/api/rpc/block-chunk#chunk-details"
        />
      }
    >
      <ConfigureTitle />
      <SearchType />
    </Form>
  );
};
