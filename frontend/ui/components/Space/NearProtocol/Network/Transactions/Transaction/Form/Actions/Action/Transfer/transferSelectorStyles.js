import { selectStyles } from '../../../_general/components/selectStyles.js';

export const transferSelectorStyles = {
  ...selectStyles,
  dropdownIndicator: (base) => ({
    ...base,
    paddingLeft: '0',
    paddingRight: '0',
  }),
  valueContainer: (base) => ({
    ...base,
    paddingLeft: '0',
    paddingRight: '0',
    textAlign: 'center',
  }),
};
