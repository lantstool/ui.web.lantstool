import { ContractId } from './ContractId/ContractId.jsx';
import { MethodName } from './MethodName/MethodName.jsx';
import {Arguments } from './Arguments/Arguments.jsx';

export const CallFunction = ({ form }) => (
  <>
    <ContractId form={form} />
    <MethodName form={form} />
    <Arguments form={form} />
  </>
);
