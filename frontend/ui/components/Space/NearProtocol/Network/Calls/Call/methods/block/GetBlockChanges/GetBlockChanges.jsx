import { BlockTarget } from '../../_general/components/BlockTarget/BlockTarget.jsx';
import { Form } from '../../_general/components/Form/Form.jsx';
import { MethodDescription } from '../../_general/components/MethodDescription/MethodDescription.jsx';
import { ConfigureTitle } from '../../_general/components/ConfigureTitle/ConfiguresTitle.jsx';
import { schema } from './schema.js';

export const GetBlockChanges = ({ call, draft }) => {
  return (
    <Form
      call={call}
      draft={draft}
      schema={schema}
      methodDescription={
        <MethodDescription
          description={
            <>Returns the changes (account-change type pairs) that occurred within a block.</>
          }
          link="https://docs.near.org/api/rpc/block-chunk#changes-in-block"
        />
      }
    >
      <ConfigureTitle />
      <BlockTarget />
    </Form>
  );
};
