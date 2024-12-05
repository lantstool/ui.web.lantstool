import { Form } from '../_general/Form/Form.jsx';
import { MethodDescription } from '../_general/MethodDescription/MethodDescription.jsx';

export const GetNetworkInfo = ({ call, draft }) => {
  return (
    <Form
      call={call}
      draft={draft}
      methodDescription={
        <MethodDescription
          description="It is used to retrieve details about the current state of network connections, such as active peers, transmitted data rates, and known producers."
          link="https://docs.near.org/api/rpc/network#network-info"
        />
      }
    />
  );
};
