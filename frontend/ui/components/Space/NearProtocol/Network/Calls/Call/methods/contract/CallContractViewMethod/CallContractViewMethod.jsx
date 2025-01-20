import { FormJsonEditor } from '../../../../../../../../_general/jsonEditor/FormJsonEditor.jsx';
import { BlockTarget } from '../../_general/components/BlockTarget/BlockTarget.jsx';
import { ContractId } from './ContractId/ContractId.jsx';
import { MethodName } from './MethodName/MethodName.jsx';
import { Form } from '../../_general/components/Form/Form.jsx';
import { MethodDescription } from '../../_general/components/MethodDescription/MethodDescription.jsx';
import { ConfigureTitle } from '../../_general/components/ConfigureTitle/ConfiguresTitle.jsx';
import { schema } from './schema.js';

export const CallContractViewMethod = ({ call, draft }) => {
  return (
    <Form
      call={call}
      draft={draft}
      schema={schema}
      methodDescription={
        <MethodDescription
          description={
            <>
              Invokes a contract’s view (read-only) method. This method cannot be used to execute
              transactions (write methods).
            </>
          }
          link="https://docs.near.org/api/rpc/contracts#call-a-contract-function"
        />
      }
    >
      <ConfigureTitle />
      <ContractId />
      <MethodName />
      <FormJsonEditor name="args" customTheme={{ contentMinHeight: '200px' }} />
      <BlockTarget />
    </Form>
  );
};
