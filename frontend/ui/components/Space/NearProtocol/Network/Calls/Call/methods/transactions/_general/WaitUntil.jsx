import { FormDropdown } from '../../../../../../../../_general/FormDropdown/FormDropdown.jsx';

const options = [
  { value: 'NONE', label: 'None' },
  { value: 'INCLUDED', label: 'Included' },
  { value: 'EXECUTED_OPTIMISTIC', label: 'Executed Optimistic' },
  { value: 'INCLUDED_FINAL', label: 'Included Final' },
  { value: 'EXECUTED', label: 'Executed' },
  { value: 'FINAL', label: 'Final' },
];

export const WaitUntil = ({ control }) => (
  <FormDropdown
    name="waitUntil"
    label="Wait Until"
    options={options}
    control={control}
    isSearchable
    isClearable
    creatableSelect
  />
);
