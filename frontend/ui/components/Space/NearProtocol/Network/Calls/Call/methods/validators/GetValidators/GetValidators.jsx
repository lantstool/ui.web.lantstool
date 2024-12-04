import { Form } from '../../_general/Form/Form.jsx';
import { EpochTarget } from './EpochTarget/EpochTarget.jsx';
import { MethodDescription } from '../../_general/MethodDescription/MethodDescription.jsx';
import { ConfigureTitle } from '../../_general/ConfigureTitle/ConfiguresTitle.jsx';

export const GetValidators = ({ call, draft }) => {
  return (
    <Form
      call={call}
      draft={draft}
      methodDescription={
        <MethodDescription
          description="It provides detailed information about validators in the network, including their stake, activity, and potential issues such as slashing or kick-outs from the previous epoch."
          link="https://docs.near.org/api/rpc/network#validation-status"
        />
      }
    >
      <ConfigureTitle />
      <EpochTarget />
    </Form>
  );
};
