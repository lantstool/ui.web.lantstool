import { Form } from '../../_general/components/Form/Form.jsx';
import { MethodDescription } from '../../_general/components/MethodDescription/MethodDescription.jsx';

export const GetNetworkInfo = ({ call, draft }) => {
  return (
    <Form
      call={call}
      draft={draft}
      methodDescription={
        <MethodDescription
          description={
            <>
              Returns data on the current state of the network, such as details about active peers.
            </>
          }
          link="https://docs.near.org/api/rpc/network#network-info"
        />
      }
    />
  );
};
