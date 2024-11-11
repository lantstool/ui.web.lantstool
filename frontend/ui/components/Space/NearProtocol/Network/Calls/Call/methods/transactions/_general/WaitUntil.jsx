import { Dropdown } from '../../../../../../../../_general/Dropdown/Dropdown.jsx';

const options = [
  { value: 'NONE', label: 'None' },
  { value: 'INCLUDED', label: 'Included' },
  { value: 'EXECUTED_OPTIMISTIC', label: 'Executed Optimistic' },
  { value: 'INCLUDED_FINAL', label: 'Included Final' },
  { value: 'EXECUTED', label: 'Executed' },
  { value: 'FINAL', label: 'Final' },
];

export const WaitUntil = ({ control }) => (
  <Dropdown
    name="waitUntil"
    label="Wait Until"
    options={options}
    control={control}
    isSearchable
    isClearable
    creatableSelect
  />
);
