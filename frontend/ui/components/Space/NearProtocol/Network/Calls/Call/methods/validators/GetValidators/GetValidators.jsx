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
          description={
            <>
              Returns information about all validators for a particular epoch, including the list of
              active validators and any validator proposals.
            </>
          }
          link="https://docs.near.org/api/rpc/network#validation-status"
        />
      }
    >
      <ConfigureTitle />
      <EpochTarget />
    </Form>
  );
};
