import { Form } from '../../_general/components/Form/Form.jsx';
import { MethodDescription } from '../../_general/components/MethodDescription/MethodDescription.jsx';

export const GetGenesisConfig = ({ call, draft }) => {
  return (
    <Form
      call={call}
      draft={draft}
      methodDescription={
        <MethodDescription
          description={<>Returns the chain configuration as it was at the network genesis.</>}
          link="https://docs.near.org/api/rpc/protocol#genesis-config"
        />
      }
    ></Form>
  );
};
