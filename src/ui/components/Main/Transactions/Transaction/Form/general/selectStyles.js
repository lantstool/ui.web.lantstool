export const selectStyles = {
  control: (styles) => ({
    ...styles,
    border: '1px solid #40916C',
    padding: '7px 12px',
    fontSize: '15px',
    fontWeight: 500,
    color: '#081C15',
    backgroundColor: 'none',
    borderRadius: '8px',
    ':hover': {
      border: '1px solid #40916C',
    },
  }),
  menu: (styles) => ({
    ...styles,
    borderRadius: '8px',
  }),
  option: (base) => ({
    ...base,
    fontSize: 15,
  }),
  indicatorSeparator: () => ({ display: 'none' }),
};
