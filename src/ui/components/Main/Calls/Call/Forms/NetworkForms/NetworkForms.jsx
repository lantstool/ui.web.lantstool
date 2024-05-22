import { ValidationStatus } from './ValidationStatus/ValidationStatus.jsx';

export const NetworkForms = ({ form, type }) => (
  <>
    {type === 'status' && null}
    {type === 'network_info' && null}
    {type === 'validators' && <ValidationStatus form={form} />}
  </>
);
