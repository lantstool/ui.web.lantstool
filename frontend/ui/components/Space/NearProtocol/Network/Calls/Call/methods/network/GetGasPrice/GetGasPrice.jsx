import { Form } from '../../_general/components/Form/Form.jsx';
import { BlockTarget } from './BlockTarget/BlockTarget.jsx';
import { MethodDescription } from '../../_general/components/MethodDescription/MethodDescription.jsx';
import { ConfigureTitle } from '../../_general/components/ConfigureTitle/ConfiguresTitle.jsx';
import { schema } from './schema.js';

export const GetGasPrice = ({ call, draft }) => {
  return (
    <Form
      call={call}
      draft={draft}
      schema={schema}
      methodDescription={
        <MethodDescription
          description={<>Returns the gas price at a specific block.</>}
          link="https://docs.near.org/api/rpc/gas#gas-price"
        />
      }
    >
      <ConfigureTitle />
      <BlockTarget />
    </Form>
  );
};
