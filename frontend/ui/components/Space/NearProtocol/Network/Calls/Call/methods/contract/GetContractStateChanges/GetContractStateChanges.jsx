import { FormInput } from '../../../../../../../../_general/input/FormInput/FormInput.jsx';
import { ContractIds } from '../../_general/components/ContractIds/ContractIds.jsx';
import { Form } from '../../_general/components/Form/Form.jsx';
import { BlockTarget } from '../../_general/components/BlockTarget/BlockTarget.jsx';
import { MethodDescription } from '../../_general/components/MethodDescription/MethodDescription.jsx';
import { ConfigureTitle } from '../../_general/components/ConfigureTitle/ConfiguresTitle.jsx';
import { schema } from './schema.js';

export const GetContractStateChanges = ({ call, draft }) => {
  return (
    <Form
      call={call}
      draft={draft}
      schema={schema}
      methodDescription={
        <MethodDescription
          description={
            <>
              Returns the state changes (key-value pairs) of a contract that occurred in a specific
              block. Changes for multiple accounts can be retrieved at the same time. You can also
              filter the results by a specified key prefix (the prefix is defined in the contract code
              for collections such as a Lookup Map).
            </>
          }
          link="https://docs.near.org/api/rpc/contracts#view-contract-state-changes"
        />
      }
    >
      <ConfigureTitle />
      <ContractIds contractIds={draft.contractIds} />
      <FormInput name="keyPrefix" label="State Prefix" />
      <BlockTarget />
    </Form>
  );
};
