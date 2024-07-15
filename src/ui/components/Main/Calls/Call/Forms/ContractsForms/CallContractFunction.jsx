import { ContractId } from '../general/ContractId/ContractId.jsx';
import { InputGroup } from '../../../../../general/InputGroup/InputGroup.jsx';
import { TextareaGroup } from '../../../../../general/TextareaGroup/TextareaGroup.jsx';

export const CallContractFunction = ({ form }) => (
  <>
    <ContractId form={form} />
    <InputGroup register={form.register} name="params.method_name" label="Method name" />
    <TextareaGroup register={form.register} name="params.args_base64" label="Arguments" rows={10} />
  </>
);
