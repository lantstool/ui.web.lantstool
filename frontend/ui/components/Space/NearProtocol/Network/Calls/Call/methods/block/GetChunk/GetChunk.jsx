import { SearchBy } from './SearchBy/SearchBy.jsx';
import { Form } from '../../_general/components/Form/Form.jsx';
import { MethodDescription } from '../../_general/components/MethodDescription/MethodDescription.jsx';
import { ConfigureTitle } from '../../_general/components/ConfigureTitle/ConfiguresTitle.jsx';
import { schema } from './schema.js';

export const GetChunk = ({ call, draft }) => {
  return (
    <Form
      call={call}
      draft={draft}
      schema={schema}
      methodDescription={
        <MethodDescription
          description={
            <>
              Returns full details about a chunk, along with brief information on its transactions
              and receipts.
            </>
          }
          link="https://docs.near.org/api/rpc/block-chunk#chunk-details"
        />
      }
    >
      <ConfigureTitle />
      <SearchBy />
    </Form>
  );
};
