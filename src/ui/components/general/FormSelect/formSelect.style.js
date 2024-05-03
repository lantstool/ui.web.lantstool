export const selectStyles = (error) => ({
  control: (styles) => ({
    ...styles,
    border: !error ? '1px solid #40916C' : '1px solid red',
    boxShadow: 'none',
    padding: '7px 12px',
    fontSize: '15px',
    fontWeight: 500,
    color: '#081C15',
    backgroundColor: 'none',
    borderRadius: '8px',
    ':hover': {
      border: !error ? '1px solid #40916C' : '1px solid red',
    },

  }),
  menu: (styles) => ({
    ...styles,
    borderRadius: '8px',
  }),
  option: (styles) => ({
    ...styles,
    fontSize: 15,
  }),
  indicatorSeparator: () => ({ display: 'none' }),
});