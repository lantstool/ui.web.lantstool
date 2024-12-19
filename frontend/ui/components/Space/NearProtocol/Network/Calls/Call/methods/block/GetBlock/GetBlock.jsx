import { BlockTarget } from '../../_general/components/BlockTarget/BlockTarget.jsx';
import { Form } from '../../_general/components/Form/Form.jsx';
import { MethodDescription } from '../../_general/components/MethodDescription/MethodDescription.jsx';
import { ConfigureTitle } from '../../_general/components/ConfigureTitle/ConfiguresTitle.jsx';
import { schema } from './schema.js';

export const GetBlock = ({ call, draft }) => {
  return (
    <Form
      call={call}
      draft={draft}
      schema={schema}
      methodDescription={
        <MethodDescription
          description={<>
            Provides a general information about the block, including chunks headers date and block approvals.
            Doesn't include chunk transactions and receipts.
          </>}
          link="https://docs.near.org/api/rpc/block-chunk#block-details"
        />
      }
    >
      <ConfigureTitle />
      <BlockTarget />
    </Form>
  );
};
