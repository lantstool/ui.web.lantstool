import { Form } from '../../_general/components/Form/Form.jsx';
import { EpochTarget } from './EpochTarget/EpochTarget.jsx';
import { MethodDescription } from '../../_general/components/MethodDescription/MethodDescription.jsx';
import { ConfigureTitle } from '../../_general/components/ConfigureTitle/ConfiguresTitle.jsx';
import { schema } from './schema.js';

export const GetValidators = ({ call, draft }) => {
  return (
    <Form
      call={call}
      draft={draft}
      schema={schema}
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
