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
          description={<>Returns the current chain configuration at a specific block.</>}
          link="https://docs.near.org/api/rpc/protocol#protocol-config"
        />
      }
    >
      <ConfigureTitle />
      <BlockTarget />
    </Form>
  );
};
