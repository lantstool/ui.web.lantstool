import { BlockTarget } from '../_general/BlockTarget/BlockTarget.jsx';
import { Form } from '../_general/Form/Form.jsx';
import { MethodDescription } from '../_general/MethodDescription/MethodDescription.jsx';
import { ConfigureTitle } from '../_general/ConfigureTitle/ConfiguresTitle.jsx';

export const GetProtocolConfig = ({ call, draft }) => {
  return (
    <Form
      call={call}
      draft={draft}
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
