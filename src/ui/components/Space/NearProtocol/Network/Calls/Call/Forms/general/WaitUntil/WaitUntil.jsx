import { FormSelectGroup } from '../../../../../../../../general/FormSelectGroup/FormSelectGroup.jsx';

const options = [
  { value: 'EXECUTED', label: 'EXECUTED' },
  { value: 'NONE', label: 'NONE' },
  { value: 'INCLUDED', label: 'INCLUDED' },
  { value: 'EXECUTED_OPTIMISTIC', label: 'EXECUTED_OPTIMISTIC' },
  { value: 'INCLUDED_FINAL', label: 'INCLUDED_FINAL' },
  { value: 'FINAL', label: 'FINAL' },
];

export const WaitUntil = ({ form }) => {
  const { control } = form;

  return (
    <FormSelectGroup
      name="params.wait_until"
      label="Wait until"
      control={control}
      options={options}
      isSearchable={true}
      isClearable={true}
      creatableSelect={true}
    />
  );
};
