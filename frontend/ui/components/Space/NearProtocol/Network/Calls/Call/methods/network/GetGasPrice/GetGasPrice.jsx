import { Form } from '../../_general/Form/Form.jsx';
import { BlockTarget } from './BlockTarget/BlockTarget.jsx';
import { MethodDescription } from '../../_general/MethodDescription/MethodDescription.jsx';
import { ConfigureTitle } from '../../_general/ConfigureTitle/ConfiguresTitle.jsx';

export const GetGasPrice = ({ call, draft }) => {
  return (
    <Form
      call={call}
      draft={draft}
      methodDescription={
        <MethodDescription
          description="Returns a gas price for the most recent or specific block."
          link="https://docs.near.org/api/rpc/gas#gas-price"
        />
      }
    >
      <ConfigureTitle />
      <BlockTarget />
    </Form>
  );
};
