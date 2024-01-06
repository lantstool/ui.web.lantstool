export const selectStyles = {
  control: (styles: any) => ({
    ...styles,
    border: '1px solid #40916C',
    padding: '5px 15px',
    fontSize: '15px',
    fontWeight: 500,
    color: '#081C15',
    borderRadius: '8px',
    ':hover': {
      border: '1px solid #40916C',
    },
  }),
  menu: (styles: any) => ({
    ...styles,
    borderRadius: '8px',
  }),
  option: (base: any) => ({
    ...base,
    fontSize: 15,
  }),
};