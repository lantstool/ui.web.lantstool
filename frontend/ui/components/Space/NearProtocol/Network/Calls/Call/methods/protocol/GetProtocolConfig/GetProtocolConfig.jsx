import { BlockTarget } from '../../_general/components/BlockTarget/BlockTarget.jsx';
import { Form } from '../../_general/components/Form/Form.jsx';
import { MethodDescription } from '../../_general/components/MethodDescription/MethodDescription.jsx';
import { ConfigureTitle } from '../../_general/components/ConfigureTitle/ConfiguresTitle.jsx';
import { schema } from './schema.js';

export const GetProtocolConfig = ({ call, draft }) => {
  return (
    <Form
      call={call}
      draft={draft}
      schema={schema}
      methodDescription={
        <MethodDescription
          description="Returns a protocol configuration for the most recent or specific block."
          link="https://docs.near.org/api/rpc/protocol#protocol-config"
        />
      }
    >
      <ConfigureTitle />
      <BlockTarget />
    </Form>
  );
};
