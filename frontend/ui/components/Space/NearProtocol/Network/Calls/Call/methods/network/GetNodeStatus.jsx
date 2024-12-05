import { Form } from '../_general/Form/Form.jsx';
import { MethodDescription } from '../_general/MethodDescription/MethodDescription.jsx';

export const GetNodeStatus = ({ call, draft }) => {
  return (
    <Form
      call={call}
      draft={draft}
      methodDescription={
        <MethodDescription
          description="Provides detailed information about the status of a NEAR node. This includes data about its synchronization state, protocol version, and more. It does not require any input parameters. "
          link="https://docs.near.org/api/rpc/network#node-status"
        />
      }
    />
  );
};
