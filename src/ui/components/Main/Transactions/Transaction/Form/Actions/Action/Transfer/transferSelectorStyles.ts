import { selectStyles } from '../../../general/selectStyles.ts';

export const transferSelectorStyles = {
  ...selectStyles,
  dropdownIndicator: (base: any) => ({
    ...base,
    paddingLeft: '0',
    paddingRight: '0',
  }),
  valueContainer: (base: any) => ({
    ...base,
    paddingLeft: '0',
    paddingRight: '0',
    textAlign: 'center',
  }),
};
