import { BlockTarget } from '../../_general/BlockTarget/BlockTarget.jsx';
import { ContractId } from './ContractId/ContractId.jsx';
import { MethodName } from './MethodName/MethodName.jsx';
import { Arguments } from './Arguments/Arguments.jsx';
import { Form } from '../../_general/Form/Form.jsx';
import { MethodDescription } from '../../_general/MethodDescription/MethodDescription.jsx';
import { ConfigureTitle } from '../../_general/ConfigureTitle/ConfiguresTitle.jsx';
import { schema } from './schema.js';

export const CallContractViewMethod = ({ call, draft }) => {
  // TODO add custom validation for the form
  return (
    <Form
      call={call}
      draft={draft}
      schema={schema}
      methodDescription={
        <MethodDescription
          description="Provides general account details, including creation date, associated keys, and possibly the contract’s state."
          link="https://docs.near.org/api/rpc/contracts#call-a-contract-function"
        />
      }
    >
      <ConfigureTitle />
      <ContractId />
      <MethodName />
      <Arguments />
      <BlockTarget />
    </Form>
  );
};
