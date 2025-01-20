import { Form } from '../../_general/components/Form/Form.jsx';
import { MethodDescription } from '../../_general/components/MethodDescription/MethodDescription.jsx';

export const GetNodeStatus = ({ call, draft }) => {
  return (
    <Form
      call={call}
      draft={draft}
      methodDescription={
        <MethodDescription
          description={
            <>
              Returns the overall status of a given node, including its sync state, nearcore
              version, protocol version, and the current set of validators.
            </>
          }
          link="https://docs.near.org/api/rpc/network#node-status"
        />
      }
    />
  );
};
